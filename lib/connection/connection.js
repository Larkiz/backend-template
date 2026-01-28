import mysql from "mysql";
import dotenv from "dotenv";
import { promisify } from "util";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  database: process.env.db,
  password: process.env.password,
  multipleStatements: true,
});

export const dbQuery = promisify(db.query).bind(db);
