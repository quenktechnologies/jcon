"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return f.includes.reduce(function (p, c) {
        return p.concat(takeDirectives(c));
    }, []).concat(f.file.directives);
};
var takeImports = function (f) {
    return f.includes.reduce(function (p, c) { return record_1.merge(p, takeImports(c)); }, f.imports);
};
//# sourceMappingURL=index.js.map