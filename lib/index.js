"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='parser.d.ts' />
var ast = require("./ast");
var either_1 = require("@quenk/noni/lib/data/either");
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
    try {
        return either_1.right(parser.parser.parse(str));
    }
    catch (e) {
        return either_1.left(e);
    }
};
//# sourceMappingURL=index.js.map