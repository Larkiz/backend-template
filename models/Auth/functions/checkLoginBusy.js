import { dbQuery } from "#lib/connection/connection";

export async function checkLoginBusy(loginHash) {
  return (
    (await dbQuery("select id from users where login_hash = ?", [
      loginHash,
    ]).then((res) => res.length)) > 0
  );
}
