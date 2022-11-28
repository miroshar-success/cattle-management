"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const express_1 = require("express");
const animal_r_middlewares_1 = require("./animal-r-middlewares");
const router = (0, express_1.Router)();
// ------- RUTAS MONGO MONGOOSE : ---------
router.post("/", jwtMiddleware_1.default, animal_r_middlewares_1.handlePostNewAnimalRequest);
router.get("/stats", jwtMiddleware_1.default, animal_r_middlewares_1.handleGetStatsRequest);
router.get("/", jwtMiddleware_1.default, animal_r_middlewares_1.handleGetAllAnimalsFromUserRequest);
router.delete("/delete/:id_senasa", jwtMiddleware_1.default, animal_r_middlewares_1.handleDeleteAnimalById);
router.get("/id/:id_senasa", jwtMiddleware_1.default, animal_r_middlewares_1.handleGetAnimalByIdRequest);
router.put("/", jwtMiddleware_1.default, animal_r_middlewares_1.handleUpdateAnimalRequest);
router.get("/typesAllowed", animal_r_middlewares_1.handleGetTypesAllowedRequest);
router.get("/search", jwtMiddleware_1.default, animal_r_middlewares_1.handleSearchByQueryRequest);
router.get("/pregnant", jwtMiddleware_1.default, animal_r_middlewares_1.handleGetPregnantSortedRequest);
exports.default = router;
