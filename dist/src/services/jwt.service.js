"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var app_config_1 = require("./../config/app.config");
var JWTService = /** @class */ (function () {
    function JWTService() {
        var _this = this;
        this.JWT_KEY = (0, app_config_1.env)("JWT_SECRET_KEY");
        this.createAccessToken = function (payload) {
            return jsonwebtoken_1.default.sign(payload, _this.JWT_KEY, {
                expiresIn: "2d",
            });
        };
        this.verifyAccessToken = function (authToken) {
            return jsonwebtoken_1.default.verify(authToken, _this.JWT_KEY, function (err, user) {
                if (err) {
                    return err;
                }
                return user;
            });
        };
    }
    return JWTService;
}());
exports.default = JWTService;
