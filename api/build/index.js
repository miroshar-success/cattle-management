"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./src/models"));
const config = require(__dirname + "/src/config/config.js");
const PORT = config.server.port || 3001;
const app = require("./src/app");
// Primero sincroniza con la database, y luego levanta el servidor :
models_1.default.sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        console.log("**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** ");
        console.log(`App listening on port ${PORT}`);
        console.log("**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** ");
    });
});
