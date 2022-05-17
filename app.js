const getUsers = require("./controllers/users.controller.js")

const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/users", getUsers);




module.exports = app;