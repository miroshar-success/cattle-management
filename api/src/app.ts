const morgan = require("morgan");
import express from "express";
import cors from "cors";

import testRouter from "./routes/test";
import animalRouter from "./routes/animal/animal-routes";
import userRouter from "./routes/user/user-routes";
import noteRouter from "./routes/note/note-routes";
import jwtCheck from "./config/jwtMiddleware";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.use(jwtCheck);
// routes middlewares:
app.use("/test", testRouter);
app.use("/animal", animalRouter);
app.use("/user", userRouter);
app.use("/note", noteRouter);

// for testing:
app.get("/", (req, res) => {
  return res.send("Yep! I'm listening your requests...");
});

app.get("/auth", jwtCheck, (req: any, res) => {
  try {
    console.log(`En /auth`);
    console.log(req.auth);
    return res.send(`En /AUTH! Tu id de usuario es ${req.auth.sub}`);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
});
//-------

module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
