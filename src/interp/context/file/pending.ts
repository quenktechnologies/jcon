import * as ast from '../../../ast';
import { dirname } from 'path';
import { Future, parallel } from '@quenk/noni/lib/control/monad/future';
import { Path } from '@quenk/noni/lib/io/file';
import { Loader } from '../loader';
import { Imports, getFileImports } from '../imports';
import { Parser } from '../parser';
import { Global } from '../global';
import { FileContext } from './';

/**
 * Pending file level context.
 *
 * This is the scope of a JCON file just before we process
 * its imports and includes.
 */
export class Pending {

    constructor(
        public global: Global,
        public parser: Parser,
        public loader: Loader) { }

    static create(global: Global, parser: Parser, loader: Loader): Pending {

        return new Pending(global, parser, loader);

    }

    /**
     * descend one level of the Pending graph by following
     * the path of an include.
     *
     * Adjusts loaders to read paths relative to the path
     * passed.
     */
    descend(path: Path): Pending {

        return new Pending(this.global, this.parser,
            this.loader.create(dirname(path)));

    }

    /**
     * toFileContext turns a Pending context into a File context.
     */
    toFileContext(file: ast.File): Future<FileContext> {

        return toFileContext(this, file);

    }

}

const toFileContext = (ctx: Pending, file: ast.File): Future<FileContext> =>
    getFileImports(ctx.loader, file)
        .chain(imports =>
            getIncludes(ctx, file)
                .map(includes => promote(ctx, file, includes, imports)));

const getIncludes = (ctx: Pending, f: ast.File): Future<FileContext[]> =>
    parallel(f.includes.map(getInclude(ctx)));

const getInclude = (ctx: Pending) => (i: ast.Include): Future<FileContext> =>
    loadFile(ctx, include2Path(i))
        .chain(file => toFileContext(ctx.descend(include2Path(i)), file));

const loadFile = (ctx: Pending, path: Path): Future<ast.File> =>
    ctx
        .loader
        .loadFile(path)
        .chain(ctx.parser);

const include2Path = (include: ast.Include): Path =>
    include.path.value;

const promote = (p: Pending, file: ast.File, inc: FileContext[], imp: Imports)
    : FileContext =>
    new FileContext(file, inc, imp, p.global);
