"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var hpp_1 = __importDefault(require("hpp"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var dotenv = __importStar(require("dotenv"));
var index_1 = require("./router/index");
dotenv.config();
var RATE_LIMIT_CONFIG = {
    windowMs: 10 * 60 * 1000,
    max: 100,
};
function default_1(app) {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, hpp_1.default)());
    app.use((0, express_rate_limit_1.default)(RATE_LIMIT_CONFIG));
    app.use((0, compression_1.default)());
    app.disable("x-powered-by");
    /**
     * API Healthcheck
     *
     * @param request
     * @param response
     */
    app.get("/", function (request, response) {
        return response.status(200).json({ status: "SERVER-ONLINE" });
    });
    /**
     * API endpoints per module
     */
    (0, index_1.initializeApiRoutes)(app);
    /**
     * Start server
     */
    app.listen(process.env.APP_PORT, function () {
        console.log("[APP]: App running in http://localhost:" + process.env.APP_PORT);
    });
}
exports.default = default_1;
