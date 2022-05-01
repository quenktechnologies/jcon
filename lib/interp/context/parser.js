"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
var ast = require("../../ast");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var __1 = require("../../");
/**
 *  parser implementation.
 */
var parser = function (src) {
    return (0, __1.parse)(src)
        .map(checkParsed)
        .orRight(future_1.raise)
        .takeRight();
};
exports.parser = parser;
var checkParsed = function (n) {
    return (n instanceof ast.File) ? (0, future_1.pure)(n) : (0, future_1.raise)(notFile(n));
};
var notFile = function (n) {
    return new Error("Expected a valid file got \"".concat(n.type, "\"!"));
};
//# sourceMappingURL=parser.js.map