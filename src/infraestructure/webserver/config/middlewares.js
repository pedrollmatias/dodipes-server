"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_cors_1 = __importDefault(require("fastify-cors"));
exports.default = (fastify) => {
    fastify.register(fastify_cors_1.default, {});
};
