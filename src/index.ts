/// <reference path='Parser.d.ts' />
import * as nodes from './ast';
import Parser = require('./Parser');

/**
 * AbstractSyntaxTree
 */
export interface AbstractSyntaxTree {

    [key: string]: nodes.Node

}

/**
 * parse source text into an abstract syntax tree.
 */
export const parse = (str: string, ast: AbstractSyntaxTree = <any>nodes): nodes.File => {

    Parser.parser.yy = { ast };
    return Parser.parser.parse(str);

}
