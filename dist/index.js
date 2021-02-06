"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
var PORT = 3001;
var products = [];
app.get('/productos', function (req, res) {
    if (!products.length) {
        res.send({ error: "No hay productos cargados" });
    }
    else {
        res.send(products);
    }
});
app.post('/productos', function (req, res) {
    var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
    var producto = {
        id: products.length + 1,
        title: title,
        price: price,
        thumbnail: thumbnail
    };
    products.push(producto);
    res.send(producto);
});
app.get('/productos/:id', function (req, res) {
    var id = Number(req.params.id);
    var producto = products.find(function (producto) { return producto.id === id; });
    if (!producto) {
        res.send({ error: "Producto no encontrado" });
    }
    res.send(producto);
});
app.listen(PORT, function () {
    console.log("Server up in port " + PORT);
});
