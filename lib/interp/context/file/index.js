"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
    return __spreadArrays(f.includes.reduce(function (p, c) {
        return p.concat(takeDirectives(c));
    }, []), f.file.directives);
};
var takeImports = function (f) {
    return f.includes.reduce(function (p, c) { return record_1.merge(p, takeImports(c)); }, f.imports);
};
//# sourceMappingURL=index.js.map