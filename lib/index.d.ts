/// <reference path="parser.d.ts" />
import { Either } from '@quenk/noni/lib/data/either';
import { File } from './ast';
/**
 * Result of attempting to parse a source text.
 */
export declare type Result = Either<Error, File>;
/**
 * parse source text into an abstract syntax tree.
 */
export declare const parse: (str: string) => Result;
