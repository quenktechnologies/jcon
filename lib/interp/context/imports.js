"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileImports = void 0;
var ast = require("../../ast");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var record_1 = require("@quenk/noni/lib/data/record");
var match_1 = require("@quenk/noni/lib/control/match");
/**
 * getFileImports from a file node.
 *
 * Recursive extracts every usage of a module into a single map.
 */
exports.getFileImports = function (r, f) {
    return future_1.parallel(f.directives.map(function (d) { return (d instanceof ast.Property) ?
        getValueImports(r, d.value) :
        future_1.pure({}); }))
        .map(function (list) { return list.reduce(record_1.merge, {}); });
};
var getValueImports = function (r, value) {
    return match_1.match(value)
        .caseOf(ast.Member, getMemberImports(r))
        .caseOf(ast.List, getListImports(r))
        .caseOf(ast.Dict, getDictImports(r))
        .orElse(function () { return future_1.pure({}); })
        .end();
};
var getMemberImports = function (loader) { return function (m) {
    return loader
        .loadModule(m.module.module)
        .map(function (t) {
        var _a;
        return (_a = {}, _a[m.module.module] = t, _a);
    });
}; };
var getListImports = function (r) { return function (l) {
    return future_1.parallel(l.elements.map(function (e) { return getValueImports(r, e); }))
        .map(function (is) { return is.reduce(record_1.merge, {}); });
}; };
var getDictImports = function (r) { return function (d) {
    return future_1.parallel(d.properties.map(function (p) { return getValueImports(r, p.value); }))
        .map(function (is) { return is.reduce(record_1.merge, {}); });
}; };
//# sourceMappingURL=imports.js.map