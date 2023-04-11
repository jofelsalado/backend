"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = __importDefault(require("./auth.controller"));
var AuthRouter = /** @class */ (function () {
    function AuthRouter() {
        this.authController = new auth_controller_1.default();
        this.router = (0, express_1.Router)();
        this.setupRoutes();
    }
    AuthRouter.prototype.setupRoutes = function () {
        this.router.post("/auth/login", this.authController.loginHandler);
        this.router.post("/auth/logout", this.authController.logoutHandler);
    };
    Object.defineProperty(AuthRouter.prototype, "getRoutes", {
        get: function () {
            return this.router;
        },
        enumerable: false,
        configurable: true
    });
    return AuthRouter;
}());
exports.default = AuthRouter;
