"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemLoader = void 0;
var path_1 = require("path");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var file_1 = require("@quenk/noni/lib/io/file");
/**
 * FileSystemLoader loader implementation.
 */
var FileSystemLoader = /** @class */ (function () {
    function FileSystemLoader(cwd) {
        this.cwd = cwd;
    }
    FileSystemLoader.prototype.loadFile = function (path) {
        return (0, file_1.readTextFile)((0, path_1.isAbsolute)(path) ? path : (0, path_1.join)(this.cwd, path));
    };
    FileSystemLoader.prototype.loadModule = function (path) {
        var _this = this;
        return (0, future_1.attempt)(function () { return require(path[0] === '.' ?
            (0, path_1.join)(_this.cwd, path) :
            path); });
    };
    FileSystemLoader.prototype.create = function (path) {
        return new FileSystemLoader((0, path_1.isAbsolute)(path) ? path : (0, path_1.join)(this.cwd, path));
    };
    return FileSystemLoader;
}());
exports.FileSystemLoader = FileSystemLoader;
//# sourceMappingURL=file-system.js.map