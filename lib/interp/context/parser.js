"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
var ast = require("../../ast");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var __1 = require("../../");
/**
 *  parser implementation.
 */
exports.parser = function (src) {
    return __1.parseDefault(src)
        .map(checkParsed)
        .orRight(future_1.raise)
        .takeRight();
};
var checkParsed = function (n) {
    return (n instanceof ast.File) ? future_1.pure(n) : future_1.raise(notFile(n));
};
var notFile = function (n) {
    return new Error("Expected a valid file got \"" + n.type + "\"!");
};
//# sourceMappingURL=parser.js.map