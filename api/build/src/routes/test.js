"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    console.log(`En test!`);
    return res.send("HOLA EN TEST!");
});
exports.default = router;
