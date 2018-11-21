/// <reference path='parser.d.ts' />
import * as ast from './ast';
import { Nodes, Node } from './ast';
import parser = require('./parser');

const ref: Nodes<Node> = <any>ast;

/**
 * parse source text into an abstract syntax tree.
 */
export const parse = (str: string, ast: Nodes<Node> = ref): Node => {

    parser.parser.yy = { ast };
    return parser.parser.parse(str);

}
