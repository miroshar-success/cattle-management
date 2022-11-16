"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require("morgan");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user/user-routes"));
const animal_routes_1 = __importDefault(require("./routes/animal/animal-routes"));
const note_routes_1 = __importDefault(require("./routes/note/note-routes"));
const jwtMiddleware_1 = __importDefault(require("./config/jwtMiddleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(morgan("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// routes middlewares:
app.use("/animal", animal_routes_1.default);
app.use("/user", user_routes_1.default);
app.use("/note", note_routes_1.default);
// for testing:
app.get("/ping", (req, res) => {
    return res.send("PONG!");
});
app.get("/auth", jwtMiddleware_1.default, (req, res) => {
    try {
        console.log(`En /auth`);
        console.log(req.auth);
        return res.send(`Tu id de usuario es ${req.auth.sub}`);
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
});
//-------
module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
