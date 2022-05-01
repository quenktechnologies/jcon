/// <reference path='parser.d.ts' />
import { Either, left, right } from '@quenk/noni/lib/data/either';
import {
    Nodes,
    File,
    Include,
    Comment,
    Property,
    Member,
    Var,
    EnvVar,
    Filter,
    Function,
    List,
    Dict,
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
export type Result = Either<Error, File>;

const tree: Nodes = {
    File, Include, Comment, Property, Member, Var, EnvVar, Filter, Function,
    List, Dict, StringLiteral, NumberLiteral, BooleanLiteral, Module, Identifier
}

/**
 * parse source text into an abstract syntax tree.
 */
export const parse = (str: string): Result => {

    parser.parser.yy = { ast: tree };

    try {

        return right(parser.parser.parse(str));

    } catch (e) {

        return <Result>left(e);

    }

}
