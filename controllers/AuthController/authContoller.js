import { errorMessages } from "#lib/service/errorMessages";
import { AuthModel } from "#models/Auth/Auth";

const validateData = { passLen: 5, loginLen: 3, usernameLen: 1 };

export const authController = {
  signUp: async (req, res) => {
    try {
      const { login = "", password = "" } = req.body || {};

      let errors = [];
      if (login.length < validateData.loginLen) {
        errors = { ...errors, login: errorMessages.shortLogin };
      }
      if (password.length < validateData.passLen) {
        errors = { ...errors, password: errorMessages.shortPassword };
      }

      // Отправка ошибок если они есть
      if (Object.keys(errors).length) {
        return res.status(422).json(errors);
      }
      const resDb = await AuthModel.signUp(login, password);

      // Если логин занят
      if (resDb?.error) {
        return res.status(resDb.status).json(resDb);
      }

      return res.status(200).json(resDb);
    } catch {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  },
  signIn: async (req, res) => {
    try {
      const { login = "", password = "" } = req.body || {};

      // Валидация
      let errors = [];
      if (
        login.length < validateData.loginLen ||
        password.length < validateData.passLen
      ) {
        errors = [...errors, errorMessages.invalidUser];
      }

      // Отправка ошибок если они есть
      if (errors.length) {
        return res.status(422).json(errors);
      }
      const resDb = await AuthModel.signIn(login, password);

      if (resDb?.error) {
        return res.status(resDb.status).json([resDb.message]);
      }

      return res.status(200).json(resDb);
    } catch {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  },
};
