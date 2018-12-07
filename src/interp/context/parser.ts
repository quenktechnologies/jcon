import * as ast from '../../ast';
import {
    Future,
    raise,
    pure
} from '@quenk/noni/lib/control/monad/future';
import {parseDefault} from '../../';

/**
 * Parser turns a text string into a File node.
 */
export type Parser = (src: string) => Future<ast.File>;

/**
 *  parser implementation.
 */
export const parser = (src: string): Future<ast.File> =>
    parseDefault(src)
        .map(checkParsed)
        .orRight(raise)
        .takeRight();

const checkParsed = (n: ast.Node): Future<ast.File> =>
    (n instanceof ast.File) ? pure(n) : raise(notFile(n));

const notFile = (n: ast.Node) =>
    new Error(`Expected a valid file got "${n.type}"!`);
