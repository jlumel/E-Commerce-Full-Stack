'use strict';

var _Productos = require('./Productos');

var _Productos2 = _interopRequireDefault(_Productos);

var _Websockets = require('./Websockets');

var _Websockets2 = _interopRequireDefault(_Websockets);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var router = _express2.default.Router();

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.static('public'));
app.use('/api', router);

var PORT = 8080;

var products = new _Productos2.default();

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

(0, _Websockets2.default)(io, products);

(0, _Router2.default)(router, products);

http.listen(PORT, function () {
    console.log('Server up in port ' + PORT);
});
