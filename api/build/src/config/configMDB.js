"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
// const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mycattlelogv1mdb.xc08ugu.mongodb.net/?retryWrites=true&w=majority`;
exports.MONGO_URI = process.env.MONGO_URI;
const SERVER_PORT = process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : 1337;
exports.config = {
    mongo: {
        url: exports.MONGO_URI,
    },
    server: {
        port: SERVER_PORT,
    },
};
// module.exports = config;
