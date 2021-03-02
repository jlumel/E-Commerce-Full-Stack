"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Routes = function (router, products) {
    router.get('/productos', function (req, res) {
        res.send(products.getProducts());
    });
    router.post('/productos', function (req, res) {
        var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
        var producto = {
            id: products.getId(),
            title: title,
            price: Number(price),
            thumbnail: thumbnail
        };
        products.addProduct(producto);
        res.send(producto);
    });
    router.get('/productos/:id', function (req, res) {
        var id = Number(req.params.id);
        res.send(products.getProductById(id));
    });
    router.put('/productos/:id', function (req, res) {
        var id = Number(req.params.id);
        var product = products.list.find(function (producto) { return producto.id === id; });
        if (!product) {
            res.sendStatus(404);
        }
        var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
        product = {
            id: id,
            title: title,
            price: Number(price),
            thumbnail: thumbnail
        };
        products.removeProduct(id);
        products.addProduct(product);
        products.list.sort(function (a, b) { return a.id - b.id; });
        res.send(product);
    });
    router.delete('/productos/:id', function (req, res) {
        var id = Number(req.params.id);
        var producto = products.list.find(function (producto) { return producto.id === id; });
        if (!producto) {
            res.sendStatus(404);
        }
        res.send(products.removeProduct(id));
    });
};
exports.default = Routes;
