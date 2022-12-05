"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const router = (0, express_1.Router)();
const user_r_middlewares_1 = require("./user-r-middlewares");
router.post("/register", jwtMiddleware_1.default, user_r_middlewares_1.handleRegisterNewUser);
router.get("/existsInDB", jwtMiddleware_1.default, user_r_middlewares_1.handleDoesUserExistInDBRequest);
router.get("/userInfo", jwtMiddleware_1.default, user_r_middlewares_1.handleGetUserInfo);
// router.get("/", getAllUsersInDB);
exports.default = router;
