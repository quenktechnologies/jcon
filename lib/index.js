"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='parser.d.ts' />
var ast = require("./ast");
var parser = require("./parser");
/**
 * tree is a map of reference nodes that can be used during parsing.
 */
exports.tree = ast;
/**
 * parse source text into an abstract syntax tree.
 */
exports.parse = function (str, ast) {
    parser.parser.yy = { ast: ast };
    return parser.parser.parse(str);
};
//# sourceMappingURL=index.js.map