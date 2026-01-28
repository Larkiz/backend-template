import { dbQuery } from "#lib/connection/connection";
import { checkLoginBusy } from "#models/Auth/functions/checkLoginBusy";
import { generateJwt } from "#lib/functions/jwtSign";
import { errorMessages } from "#lib/service/errorMessages";
import { sha256 } from "js-sha256";

export const AuthModel = {
  signUp: async (login, password) => {
    // хеш логина и проверка на существование
    const hashLogin = sha256(login);

    const loginIsBusy = await checkLoginBusy(hashLogin);

    if (loginIsBusy) {
      return { login: errorMessages.loginIsBusy };
    }

    // работа с бд
    const hashPassword = sha256(password);

    const { insertId } = await dbQuery(
      "INSERT INTO `users`( `login`, `password`) VALUES (?,?)",
      [hashLogin, hashPassword],
    );

    // 200 -> возвращаем JWT
    return { token: generateJwt(insertId) };
  },
  signIn: async (login, password) => {
    const hashLogin = sha256(login);

    const user = await dbQuery("select * from users where login = ?", [
      hashLogin,
    ]);

    if (user.length === 0 || user[0].password !== sha256(password)) {
      return { error: true, message: errorMessages.invalidUser, status: 422 };
    }

    // 200 -> возвращаем JWT
    return { token: generateJwt(user[0].id) };
  },
};
