import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import cors from "cors";

import userRouter from "./routes/user/user-routes";
import animalRouter from "./routes/animal/animal-routes";
import noteRouter from "./routes/note/note-routes";
import jwtCheck from "./config/jwtMiddleware";
import { limiter } from "./config/rateLimiter";

const app = express();
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes middlewares:
app.use("/animal", animalRouter);
app.use("/user", userRouter);
app.use("/note", noteRouter);

// for testing:
app.get("/ping", (req, res) => {
  return res.send("PONG!");
});

app.get("/auth", jwtCheck, (req: any, res) => {
  try {
    console.log(`En /auth`);
    console.log(req.auth);
    return res.send(`Tu id de usuario es ${req.auth.sub}`);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
});
//-------

module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
