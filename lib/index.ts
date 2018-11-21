/// <reference path='parser.d.ts' />
import * as nodes from './ast';
import parser = require('./parser');

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

    parser.parser.yy = { ast };
    return parser.parser.parse(str);

}
