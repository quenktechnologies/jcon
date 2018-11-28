/// <reference path='parser.d.ts' />
import { Either, left, right } from '@quenk/noni/lib/data/either';
import {
    Nodes,
    Node,
    File,
    Include,
    Comment,
    Property,
    Member,
    EnvVar,
    List,
    Dict,
    Pair,
    StringLiteral,
    NumberLiteral,
    BooleanLiteral,
    Module,
    Identifier
} from './ast';
import parser = require('./parser');

/**
 * Result of attempting to parse a source text.
 */
export type Result<N extends Node> = Either<Error, N>;


/**
 * tree is a map of reference nodes that can be used during parsing.
 */
export const tree: Nodes<Node> = {
    File, Include, Comment, Property, Member, EnvVar, List, Dict, Pair,
    StringLiteral, NumberLiteral, BooleanLiteral, Module, Identifier
}

/**
 * parse source text into an abstract syntax tree.
 */
export const parse = <N extends Node>(str: string, ast: Nodes<N>): Result<N> => {

    parser.parser.yy = { ast };

    try {

        return right(parser.parser.parse(str));

    } catch (e) {

        return left(e);

    }

}
