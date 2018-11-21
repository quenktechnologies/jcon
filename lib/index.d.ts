/// <reference path="parser.d.ts" />
import * as ast from './ast';
import { Nodes, Node } from './ast';
/**
 * tree is a map of reference nodes that can be used during parsing.
 */
export declare const tree: Nodes<Node>;
/**
 * parse source text into an abstract syntax tree.
 */
export declare const parse: <N extends ast.Node>(str: string, ast: ast.Nodes<N>) => N;
