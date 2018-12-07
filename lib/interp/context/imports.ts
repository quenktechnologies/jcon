import * as ast from '../../ast';
import { Future, pure, parallel } from '@quenk/noni/lib/control/monad/future';
import { merge } from '@quenk/noni/lib/data/record';
import { match } from '@quenk/noni/lib/control/match';
import { Loader } from './loader';

/**
 * Type representing any valid ES value.
 */
export type Type = any;

/**
 * Imports map.
 */
export interface Imports {

    [key: string]: Type

}

/**
 * getFileImports from a file node.
 *
 * Recursive extracts every usage of a module into a single map.
 */
export const getFileImports = (r: Loader, f: ast.File): Future<Imports> =>
    parallel(f.directives.map(d => (d instanceof ast.Property) ?
        getValueImports(r, d.value) :
        pure({})))
        .map(list => list.reduce(merge, {}));

const getValueImports = (r: Loader, value: ast.Value): Future<Imports> =>
    <Future<Imports>>match(value)
        .caseOf(ast.Member, getMemberImports(r))
        .caseOf(ast.List, getListImports(r))
        .caseOf(ast.Dict, getDictImports(r))
        .orElse(() => pure({}))
        .end();

const getMemberImports = (loader: Loader) => (m: ast.Member): Future<Imports> =>
    loader
        .loadModule(m.module.module)
        .map(t => ({ [m.module.module]: t }));

const getListImports = (r: Loader) => (l: ast.List): Future<Imports> =>
    parallel(l.elements.map(e => getValueImports(r, e)))
        .map(is => is.reduce(merge, {}));

const getDictImports = (r: Loader) => (d: ast.Dict): Future<Imports> =>
    parallel(d.properties.map(p => getValueImports(r, p.value)))
        .map(is => is.reduce(merge, {}));
