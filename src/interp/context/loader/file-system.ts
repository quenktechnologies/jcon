import { isAbsolute, join } from 'path';
import { Path } from '@quenk/noni/lib/io/file';
import { Future, attempt } from '@quenk/noni/lib/control/monad/future';
import { readTextFile } from '@quenk/noni/lib/io/file';
import { Loader, Module } from './';

/**
 * FileSystemLoader loader implementation.
 */
export class FileSystemLoader implements Loader {

    constructor(public cwd: Path) { }

    loadFile(path: Path): Future<string> {

        return readTextFile(isAbsolute(path) ? path : join(this.cwd, path));

    }

    loadModule(path: Path): Future<Module> {

        return attempt(() => require(path[0] === '.' ?
            join(this.cwd, path) :
            path));

    }

    create(path: Path): FileSystemLoader {

        return new FileSystemLoader(isAbsolute(path) ? path : join(this.cwd, path));

    }

}
