"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
var hashPassword = function (password) {
    return password;
};
exports.hashPassword = hashPassword;
var verifyPassword = function (rawPassword, hashedPassword) {
    return false;
};
exports.verifyPassword = verifyPassword;
