"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const middlewares_1 = __importDefault(require("./middlewares"));
const fastify = (0, fastify_1.default)({ logger: true });
(0, middlewares_1.default)(fastify);
exports.default = fastify;
