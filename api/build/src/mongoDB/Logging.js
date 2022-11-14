"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingNC = void 0;
const chalk_1 = __importDefault(require("chalk"));
class LogWithColors {
}
exports.default = LogWithColors;
_a = LogWithColors;
LogWithColors.log = (args) => _a.info(args);
LogWithColors.info = (args) => console.log(chalk_1.default.green(`[${new Date().toLocaleString()}] [INFO] `), typeof args === "string" ? chalk_1.default.greenBright(args) : args);
LogWithColors.warn = (args) => console.log(chalk_1.default.yellow(`[${new Date().toLocaleString()}] [INFO] `), typeof args === "string" ? chalk_1.default.yellowBright(args) : args);
LogWithColors.error = (args) => console.log(chalk_1.default.red(`[${new Date().toLocaleString()}] [INFO] `), typeof args === "string" ? chalk_1.default.red(args) : args);
class LoggingNC {
}
exports.LoggingNC = LoggingNC;
LoggingNC.info = (args) => console.log("\x1b[36m%s\x1b[0m", `${new Date().toLocaleString()} [INFO]`, typeof args === "string" ? args : args);
LoggingNC.warn = (args) => console.log("\x1b[33m%s\x1b[0m", `${new Date().toLocaleString()} [INFO]`, typeof args === "string" ? args : args);
LoggingNC.error = (args) => console.log("\x1b[31m", `${new Date().toLocaleString()} [INFO]`, typeof args === "string" ? args : args);
