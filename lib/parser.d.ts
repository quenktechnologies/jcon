import { File } from './ast';

/**
 * Parser 
 */
export interface Parser {

    /**
     * parse a source text into an AST.
     */
    parse(src: string): File;

    /**
     * yy contains identifiers used during parsing.
     */
    yy: any;

}

export declare let parser: Parser;
