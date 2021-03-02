"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Files = /** @class */ (function () {
    function Files(file) {
        this.file = file;
    }
    Files.prototype.read = function () {
        try {
            return fs_1.default.readFileSync(this.file, 'utf-8') + '\n';
        }
        catch (error) {
            console.log(error);
            return '';
        }
    };
    Files.prototype.write = function (message) {
        if (this.read()) {
            fs_1.default.writeFile(this.file, this.read() + message, function (error) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('File updated');
                }
            });
        }
        else {
            fs_1.default.writeFile(this.file, message, function (error) {
                if (error) {
                    console.log(error);
                }
                console.log('File created');
            });
        }
    };
    return Files;
}());
exports.default = Files;
