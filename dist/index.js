"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Import des modules nécessaires
 */
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const config_1 = __importDefault(require("./config"));
console.log(config_1.default);
const PORT = 3000;
//create instance server
const app = (0, express_1.default)();
// middleware to parse incoming requests
app.use(express_1.default.json());
// HTTP request logger middleware
app.use((0, morgan_1.default)('common'));
// HTTP security middleware
app.use((0, helmet_1.default)());
// Apply the rate limiting middleware to all requests
app.use((0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many accounts created from this IP, please try again after an hour',
}));
// add routing for / path
app.get('/', (req, res) => {
    throw new Error('Une erreure existe');
    res.json({
        message: 'Hello world 🌍',
    });
});
// Request Post
app.post('/', (req, res) => {
    // console.log(req.body);
    res.json({
        message: 'Hello world 🌍 from post',
        data: req.body,
    });
});
app.use(error_middleware_1.default);
app.use((_req, res) => {
    res.status(404).json({
        message: 'Ohh vous êtes perdu, lisez la documentation de l"API pour retrouver le chemin du retour 😂',
    });
});
// start server express
app.listen(PORT, () => {
    console.log(`My server running at port : ${PORT}`);
});
exports.default = app;
