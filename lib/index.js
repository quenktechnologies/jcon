"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='parser.d.ts' />
var ast = require("./ast");
var parser = require("./parser");
var ref = ast;
/**
 * parse source text into an abstract syntax tree.
 */
exports.parse = function (str, ast) {
    if (ast === void 0) { ast = ref; }
    parser.parser.yy = { ast: ast };
    return parser.parser.parse(str);
};
//# sourceMappingURL=index.js.map