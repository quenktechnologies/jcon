import { FileSystemLoader } from '../loader/file-system';
import { parser as jcon } from '../parser';
import {Global} from '.';

/**
 * newContext generates the default Global context for 
 * node environments.
 */
export const newContext = (path: string) : Global => ({

    loader: new FileSystemLoader(path),

    parsers: {

        jcon

    },

    env: process.env

})

