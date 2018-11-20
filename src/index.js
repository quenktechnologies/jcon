"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='Parser.d.ts' />
var nodes = require("./ast");
var Parser = require("./Parser");
/**
 * parse source text into an abstract syntax tree.
 */
exports.parse = function (str, ast) {
    if (ast === void 0) { ast = nodes; }
    Parser.parser.yy = { ast: ast };
    return Parser.parser.parse(str);
};
//# sourceMappingURL=index.js.map