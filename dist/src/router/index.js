"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApiRoutes = void 0;
/**
 * Module Routers
 */
var auth_router_1 = __importDefault(require("./../modules/auth/auth.router"));
var ROUTER = {
    $auth: new auth_router_1.default(),
};
var initializeApiRoutes = function (app) {
    app.use("/api/v1", ROUTER.$auth.getRoutes);
    // ROUTER.$auth.getRoutes.stack
    // 	.filter((r: any) => r.route)
    // 	.forEach((r: any) => console.log({ path: r.route.path, method: r.route.stack[0].method }));
};
exports.initializeApiRoutes = initializeApiRoutes;
