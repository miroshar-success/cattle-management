"use strict";
const express = require("express");
const server = express();
server.listen(3001, () => {
    console.log(`Escuchando en servidor 3001`);
});
