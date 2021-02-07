"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Productos_1 = __importDefault(require("./Productos"));
var app = express_1.default();
app.use(express_1.default.json());
var PORT = 8080;
var products = new Productos_1.default();
app.get('/productos', function (req, res) {
    res.send(products.getProducts());
});
app.post('/productos', function (req, res) {
    var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
    var producto = {
        id: products.list.length + 1,
        title: title,
        price: price,
        thumbnail: thumbnail
    };
    products.addProduct(producto);
    res.send(producto);
});
app.get('/productos/:id', function (req, res) {
    var id = Number(req.params.id);
    res.send(products.getProductById(id));
});
var server = app.listen(PORT, function () {
    console.log("Server up in port " + PORT);
});
server.on('error', function (error) {
    console.log("Ha ocurrido el siguiente error " + error);
});
