import * as ast from '../../../ast';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Path } from '@quenk/noni/lib/io/file';
import { Loader } from '../loader';
import { Parser } from '../parser';
import { Global } from '../global';
import { FileContext } from './';
/**
 * Pending file level context.
 *
 * This is the scope of a JCON file just before we process
 * its imports and includes.
 */
export declare class Pending {
    global: Global;
    parser: Parser;
    loader: Loader;
    constructor(global: Global, parser: Parser, loader: Loader);
    static create(global: Global, parser: Parser, loader: Loader): Pending;
    /**
     * descend one level of the Pending graph by following
     * the path of an include.
     *
     * Adjusts loaders to read paths relative to the path
     * passed.
     */
    descend(path: Path): Pending;
    /**
     * toFileContext turns a Pending context into a File context.
     */
    toFileContext(file: ast.File): Future<FileContext>;
}
