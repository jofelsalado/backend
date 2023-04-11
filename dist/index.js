"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app_bootstrap_1 = __importDefault(require("./src/app.bootstrap"));
try {
    (0, app_bootstrap_1.default)((0, express_1.default)());
}
catch (error) {
    process.exit(1);
}
