import { errorMessages } from "#lib/service/errorMessages";
import { jwt } from "#lib/service/jwt";
import { secretKey } from "#lib/service/secretKey";

export function jwtAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        return res.status(404).json({ message: errorMessages.unauthorized });
      } else {
        req.user = payload;

        next();

        if (!req.user) next();
      }
    });
  } else {
    return res.status(401).json({ message: errorMessages.unauthorized });
  }
}
