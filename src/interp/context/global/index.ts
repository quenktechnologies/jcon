import { Loader } from '../loader';
import { Parser } from '../parser';
import { Type } from '@quenk/noni/lib/data/type';

/**
 * Global context all files are interpreted in.
 */
export interface Global {

    /**
     * loader configured for the Context.
     */
    loader: Loader;

    /**
     * parsers used during interpretation.
     */
    parsers: {

        /**
         * jcon parser configured.
         */
        jcon: Parser

    },

    /**
     * functions available for application.
     */
    functions: {

        [key: string]: (...args: Type[]) => Type

    },

    /**
     * env contains environment variables.
     */
    env: NodeJS.ProcessEnv

}
