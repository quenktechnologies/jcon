/// <reference types="node" />
import { Loader } from '../loader';
import { Parser } from '../parser';
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
        jcon: Parser;
    };
    /**
     * env contains environment variables.
     */
    env: NodeJS.ProcessEnv;
}
