import * as ast from '../../ast';
import { Future } from '@quenk/noni/lib/control/monad/future';
/**
 * Parser turns a text string into a File node.
 */
export declare type Parser = (src: string) => Future<ast.File>;
/**
 *  parser implementation.
 */
export declare const parser: (src: string) => Future<ast.File>;
