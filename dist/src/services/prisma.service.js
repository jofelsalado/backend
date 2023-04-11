"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var PrismaService = /** @class */ (function () {
    function PrismaService() {
        this.prismaClient = new client_1.PrismaClient();
    }
    Object.defineProperty(PrismaService.prototype, "prisma", {
        get: function () {
            return this.prismaClient;
        },
        enumerable: false,
        configurable: true
    });
    return PrismaService;
}());
exports.default = PrismaService;
