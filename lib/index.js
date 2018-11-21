"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='parser.d.ts' />
var nodes = require("./ast");
var parser = require("./parser");
/**
 * parse source text into an abstract syntax tree.
 */
exports.parse = function (str, ast) {
    if (ast === void 0) { ast = nodes; }
    parser.parser.yy = { ast: ast };
    return parser.parser.parse(str);
};
//# sourceMappingURL=index.js.map