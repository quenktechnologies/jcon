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

/**
 * parse a source text into an AST.
 */
export declare function parse(src: string): File;

export declare let parser: Parser;
