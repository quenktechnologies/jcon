/// <reference path="../src/Parser.d.ts" />
import * as nodes from './Node';
export { Node as Node } from './Node';
export interface AST {
    [key: string]: nodes.Node;
}
export interface Context {
    symbols: SymbolTable;
    output: string[];
}
export interface SymbolTable {
    [key: string]: Variable;
}
export declare class Variable {
    id: string;
    constructor(id: string);
}
export declare const parse: (str: string, ast?: AST) => nodes.File;
export declare const code: (n: nodes.Node) => string;
export declare const compile: (src: string) => string;
