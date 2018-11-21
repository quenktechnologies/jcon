/// <reference path="parser.d.ts" />
import * as nodes from './ast';
/**
 * AbstractSyntaxTree
 */
export interface AbstractSyntaxTree {
    [key: string]: nodes.Node;
}
/**
 * parse source text into an abstract syntax tree.
 */
export declare const parse: (str: string, ast?: AbstractSyntaxTree) => nodes.File;
