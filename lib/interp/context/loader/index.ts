import { Future } from '@quenk/noni/lib/control/monad/future';
import { Path } from '@quenk/noni/lib/io/file';

/**
 * Module interface.
 */
export interface Module {

  [key:string]: any

}

/**
 * Loader used to fetch file contents or node modules.
 */
export interface Loader {

    /**
     * loadFile at the specified path.
     */
    loadFile(path: Path): Future<string>;


  /**
   * loadModule at the specified path.
   */
  loadModule(path:Path) : Future<Module>;

    /**
     * create a new Loader instance that will treat the specified path
     * as the current directory.
     */
    create(path: Path): Loader

}
