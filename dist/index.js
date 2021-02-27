"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Productos_1 = __importDefault(require("./Productos"));
var Websockets_1 = __importDefault(require("./Websockets"));
var express_1 = __importDefault(require("express"));
var Router_1 = __importDefault(require("./Router"));
var app = express_1.default();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var router = express_1.default.Router();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use('/api', router);
var PORT = 8080;
var products = new Productos_1.default();
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
Websockets_1.default(io, products);
Router_1.default(router, products);
http.listen(PORT, function () {
    console.log("Server up in port " + PORT);
});
