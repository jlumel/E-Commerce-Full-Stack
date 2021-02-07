"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Productos = /** @class */ (function () {
    function Productos() {
        this.list = [];
    }
    Productos.prototype.getProducts = function () {
        if (!this.list.length) {
            return ({ error: "No hay productos cargados" });
        }
        else {
            return this.list;
        }
    };
    Productos.prototype.addProduct = function (producto) {
        this.list.push(producto);
        return producto;
    };
    Productos.prototype.getProductById = function (id) {
        var producto = this.list.find(function (producto) { return producto.id === id; });
        if (!producto) {
            return { error: "Producto no encontrado" };
        }
        return producto;
    };
    return Productos;
}());
exports.default = Productos;
