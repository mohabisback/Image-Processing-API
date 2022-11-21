"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var corsOptions_1 = __importDefault(require("./src/options/corsOptions"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var helmet_1 = __importDefault(require("helmet"));
var imgRouter_1 = __importDefault(require("./src/routers/imgRouter"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var port = process.env.PORT || 5000;
var app = (0, express_1.default)();
app.set('trust proxy', 1);
//MiddleWares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_PARSER_SECRET));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('./'));
//Curb Cores Error by adding a header here
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-HTTP-Method-Override');
    next();
});
//Routers
app.use('/api/images', imgRouter_1.default);
app.use('*', function (req, res) {
    res.status(404).json({ error: 'Page not found...' });
});
app.listen(port, function () {
    console.log("[server]: running at port: ".concat(port));
});
exports.default = app;
