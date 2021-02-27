"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Files_1 = __importDefault(require("./Files"));
var files = new Files_1.default('chatlog.txt');
var Websockets = function (io, products) {
    io.on('connection', function (socket) {
        console.log("Nueva conexi\u00F3n ID: " + socket.id);
        if (products.list.length) {
            products.list.forEach(function (product) { return socket.emit('product', product); });
        }
        socket.on('product', function (message) {
            var producto = __assign({ id: products.getId() }, message);
            io.emit('product', message);
            products.addProduct(producto);
        });
        socket.on('chat', function (message) {
            var msj = Object.values(message).join(' ');
            files.write(msj);
            io.emit('chat', message);
        });
    });
    io.on('disconnect', function () {
        console.log('Se desconecto el Websocket');
    });
};
exports.default = Websockets;
