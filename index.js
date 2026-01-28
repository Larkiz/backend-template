import express from "express";
import { authRouter } from "#routes/auth.router";

const app = express();

const host = "127.0.0.1";
const port = 7000;

app.use(express.json());

app.use("/api", authRouter);

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`),
);
