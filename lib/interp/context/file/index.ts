import * as ast from '../../../ast';
import { merge } from '@quenk/noni/lib/data/record';
import { Global } from '../global';
import { Imports } from '../imports';

/**
 * FileContext level context.
 *
 * This class represents the scope of a single JCON file,
 * either the top level file or one of its includes.
 */
export class FileContext {

    constructor(
        public file: ast.File,
        public includes: FileContext[],
        public imports: Imports,
        public global: Global) { }

    /**
     * union combines all the included FileContexts
     * of this FileContext into one.
     */
    union(): FileContext {

        return new FileContext(
            cloneFileNode(this),
            [],
            takeImports(this),
            this.global);

    }

}

const cloneFileNode = (f: FileContext): ast.File =>
    new ast.File([], takeDirectives(f), f.file.location);

const takeDirectives = (f: FileContext): ast.Directive[] =>
    [...f.includes.reduce((p: ast.Directive[], c) =>
        p.concat(takeDirectives(c)), []), ...f.file.directives];

const takeImports = (f: FileContext): Imports =>
    f.includes.reduce((p: Imports, c) => merge(p, takeImports(c)), f.imports);
