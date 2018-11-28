"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='parser.d.ts' />
var either_1 = require("@quenk/noni/lib/data/either");
var ast_1 = require("./ast");
var parser = require("./parser");
/**
 * tree is a map of reference nodes that can be used during parsing.
 */
exports.tree = {
    File: ast_1.File, Include: ast_1.Include, Comment: ast_1.Comment, Property: ast_1.Property, Member: ast_1.Member, EnvVar: ast_1.EnvVar, List: ast_1.List, Dict: ast_1.Dict, Pair: ast_1.Pair,
    StringLiteral: ast_1.StringLiteral, NumberLiteral: ast_1.NumberLiteral, BooleanLiteral: ast_1.BooleanLiteral, Module: ast_1.Module, Identifier: ast_1.Identifier
};
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