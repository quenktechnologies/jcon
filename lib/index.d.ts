/// <reference path="parser.d.ts" />
import { Either } from '@quenk/noni/lib/data/either';
import { Nodes, Node, File } from './ast';
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
export declare const parse: (str: string, ast: Nodes<Node>) => Result<File>;
/**
 * parseDefault
 *
 * Uses the builtin AST.
 */
export declare const parseDefault: (src: string) => Result<Node>;
