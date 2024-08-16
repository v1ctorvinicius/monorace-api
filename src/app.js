"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthController_1 = require("./adapters/in/http/controllers/AuthController");
var express_1 = require("express");
var cors = require("cors");
// const dotenv = require("dotenv").config();
var port = process.env.PORT;
var App = /** @class */ (function () {
    function App() {
        this.server = (0, express_1.default)();
        this.server.use(cors());
        this.middleware();
        this.routes();
    }
    App.prototype.routes = function () {
        this.server.get("/login", AuthController_1.authenticateUser);
    };
    App.prototype.middleware = function () {
        this.server.use(express_1.default.json());
    };
    return App;
}());
var app = new App().server.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
