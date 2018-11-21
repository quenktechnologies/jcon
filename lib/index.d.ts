/// <reference path="parser.d.ts" />
import * as ast from './ast';
/**
 * parse source text into an abstract syntax tree.
 */
export declare const parse: (str: string, ast?: ast.Nodes<ast.Node>) => ast.Node;
