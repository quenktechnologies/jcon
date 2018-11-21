import { Node } from './ast';

/**
 * Parser 
 */
export interface Parser {

    /**
     * parse a source text into an AST.
     */
    parse<N extends Node>(src: string): N;

    /**
     * yy contains identifiers used during parsing.
     */
    yy: any;

}

export declare let parser: Parser;
