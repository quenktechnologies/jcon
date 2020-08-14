"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
/// <reference path='parser.d.ts' />
var either_1 = require("@quenk/noni/lib/data/either");
var ast_1 = require("./ast");
var parser = require("./parser");
var tree = {
    File: ast_1.File, Include: ast_1.Include, Comment: ast_1.Comment, Property: ast_1.Property, Member: ast_1.Member, Var: ast_1.Var, EnvVar: ast_1.EnvVar, Filter: ast_1.Filter, Function: ast_1.Function,
    List: ast_1.List, Dict: ast_1.Dict, StringLiteral: ast_1.StringLiteral, NumberLiteral: ast_1.NumberLiteral, BooleanLiteral: ast_1.BooleanLiteral, Module: ast_1.Module, Identifier: ast_1.Identifier
};
/**
 * parse source text into an abstract syntax tree.
 */
exports.parse = function (str) {
    parser.parser.yy = { ast: tree };
    try {
        return either_1.right(parser.parser.parse(str));
    }
    catch (e) {
        return either_1.left(e);
    }
};
//# sourceMappingURL=index.js.map