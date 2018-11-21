/// <reference path="parser.d.ts" />
import * as ast from './ast';
import { Either } from '@quenk/noni/lib/data/either';
import { Nodes, Node } from './ast';
/**
 * Result of attempting to parse a source text.
 */
export declare type Result<N extends Node> = Either<Error, N>;
/**
 * tree is a map of reference nodes that can be used during parsing.
 */
export declare const tree: Nodes<Node>;
/**
 * parse source text into an abstract syntax tree.
 */
export declare const parse: <N extends ast.Node>(str: string, ast: ast.Nodes<N>) => Either<Error, N>;
