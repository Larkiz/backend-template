import { jwt } from "#lib/service/jwt";
import { secretKey } from "#lib/service/secretKey";

export function generateJwt(id) {
  return jwt.sign({ id }, secretKey);
}
