"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContext = void 0;
var ast = require("../../../ast");
var record_1 = require("@quenk/noni/lib/data/record");
/**
 * FileContext level context.
 *
 * This class represents the scope of a single JCON file,
 * either the top level file or one of its includes.
 */
var FileContext = /** @class */ (function () {
    function FileContext(file, includes, imports, global) {
        this.file = file;
        this.includes = includes;
        this.imports = imports;
        this.global = global;
    }
    /**
     * union combines all the included FileContexts
     * of this FileContext into one.
     */
    FileContext.prototype.union = function () {
        return new FileContext(cloneFileNode(this), [], takeImports(this), this.global);
    };
    return FileContext;
}());
exports.FileContext = FileContext;
var cloneFileNode = function (f) {
    return new ast.File([], takeDirectives(f), f.file.location);
};
var takeDirectives = function (f) {
    return __spreadArray(__spreadArray([], f.includes.reduce(function (p, c) {
        return p.concat(takeDirectives(c));
    }, []), true), f.file.directives, true);
};
var takeImports = function (f) {
    return f.includes.reduce(function (p, c) { return (0, record_1.merge)(p, takeImports(c)); }, f.imports);
};
//# sourceMappingURL=index.js.map