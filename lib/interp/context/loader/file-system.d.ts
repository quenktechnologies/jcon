import { Path } from '@quenk/noni/lib/io/file';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Loader, Module } from './';
/**
 * FileSystemLoader loader implementation.
 */
export declare class FileSystemLoader implements Loader {
    cwd: Path;
    constructor(cwd: Path);
    loadFile(path: Path): Future<string>;
    loadModule(path: Path): Future<Module>;
    create(path: Path): FileSystemLoader;
}
