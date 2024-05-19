"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Oups ! quelque chose sest mal passé !';
    res.status(status).json({ status, message });
};
exports.default = errorMiddleware;
