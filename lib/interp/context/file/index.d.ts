import * as ast from '../../../ast';
import { Global } from '../global';
import { Imports } from '../imports';
/**
 * FileContext level context.
 *
 * This class represents the scope of a single JCON file,
 * either the top level file or one of its includes.
 */
export declare class FileContext {
    file: ast.File;
    includes: FileContext[];
    imports: Imports;
    global: Global;
    constructor(file: ast.File, includes: FileContext[], imports: Imports, global: Global);
    /**
     * union combines all the included FileContexts
     * of this FileContext into one.
     */
    union(): FileContext;
}
