import * as ast from '../../ast';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Loader } from './loader';
/**
 * Type representing any valid ES value.
 */
export declare type Type = any;
/**
 * Imports map.
 */
export interface Imports {
    [key: string]: Type;
}
/**
 * getFileImports from a file node.
 *
 * Recursive extracts every usage of a module into a single map.
 */
export declare const getFileImports: (r: Loader, f: ast.File) => Future<Imports>;
