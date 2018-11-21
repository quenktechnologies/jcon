/// <reference path='parser.d.ts' />
import * as ast from './ast';
import { Nodes, Node } from './ast';
import parser = require('./parser');

/**
 * tree is a map of reference nodes that can be used during parsing.
 */
export const tree: Nodes<Node> = <any>ast;

/**
 * parse source text into an abstract syntax tree.
 */
export const parse = <N extends Node>(str: string, ast: Nodes<N>): N => {

    parser.parser.yy = { ast };
    return parser.parser.parse(str);

}
