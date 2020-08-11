import * as ast from '../ast';

import { set } from '@quenk/noni/lib/data/record/path';
import {
    Future,
    raise,
    pure,
    parallel,
    sequential
} from '@quenk/noni/lib/control/monad/future';
import { rmerge } from '@quenk/noni/lib/data/record';
import { match } from '@quenk/noni/lib/control/match';

import { Pending } from './context/file/pending';
import { FileContext } from './context/file';
import { Global } from './context/global';
import { Output } from './output';

/**
 * Type
 */
export type Type = any;

/**
 * interp source text into an Output object.
 */
export const interp = (ctx: Global, src: string): Future<Output> =>
    ctx.parsers.jcon(src)
        .chain(mkFileContext(ctx))
        .chain(c => interpFile(c, c.file));

const mkFileContext = (ctx: Global) => (file: ast.File): Future<FileContext> =>
    Pending
        .create(ctx, ctx.parsers.jcon, ctx.loader)
        .toFileContext(file)
        .map(c => c.union());

/**
 * interpFile
 */
export const interpFile = (ctx: FileContext, f: ast.File): Future<Output> =>
    parallel(f.directives.map(d => interpDirective(ctx, d)))
        .map(list => list.reduce((p, c) => rmerge(p, c), {}));

/**
 * interpDirective node into Output.
 *
 * Note: Comment directives are effectively ignored.
 */
export const interpDirective = (ctx: FileContext, d: ast.Directive)
    : Future<Output> =>
    (d instanceof ast.Property) ?
        interpProperty(ctx, d) :
        pure({});

const interpProperty = (ctx: FileContext, p: ast.Property): Future<Output> =>
    interpValue(ctx, p.value)
        .chain(value => pure(set(flatPath(p.path), value, {})));

const flatPath = (path: ast.Identifier[]): string =>
    path.map(p => p.value).join('.');

/**
 * interpValues
 */
export const interpValues = (ctx: FileContext, vals: ast.Value[])
    : Future<Type[]> =>
    sequential(vals.map(v => interpValue(ctx, v)));

/**
 * interpValue node into a Type.
 */
export const interpValue = (ctx: FileContext, val: ast.Value): Future<Type> =>
    <Future<Type>>match(val)
        .caseOf(ast.Member, interpMember(ctx))
        .caseOf(ast.EnvVar, interpVar(ctx))
        .caseOf(ast.EnvVar, interpEnvVar(ctx))
        .caseOf(ast.List, interpList(ctx))
        .caseOf(ast.Dict, dict2TS(ctx))
        .caseOf(ast.StringLiteral, interpLiteral)
        .caseOf(ast.NumberLiteral, interpLiteral)
        .caseOf(ast.BooleanLiteral, interpLiteral)
        .caseOf(ast.Identifier, interpLiteral)
        .end();

const interpMember = (ctx: FileContext) => (m: ast.Member): Future<Type> => {

    let id = m.module.module;
    let member = m.member.value;

    if (m.invocation) {

        try {

            let f = ctx.imports[id][member];

            return parallel(m.parameters.map(v => interpValue(ctx, v)))
                .map(params => f.apply(null, params));

        } catch (e) {

            return raise(new Error(`Error while invoking module ` +
                `"${m.module.module}#${m.member.value}": \n` + e.stack));

        }

    } else {

        return pure(ctx.imports[id][member]);

    }

}

const interpVar = (_: FileContext) => (_: ast.Var): Future<string> => pure("");

const interpEnvVar = (ctx: FileContext) => (e: ast.EnvVar): Future<string> =>
    pure(<string>ctx.global.env[e.key.value]);

const interpList = (ctx: FileContext) => (l: ast.List): Future<Type[]> =>
    parallel(l.elements.map(e => interpValue(ctx, e)));

const dict2TS = (ctx: FileContext) => (d: ast.Dict): Future<Output> =>
    d
        .properties
        .reduce((p: Future<Output>, c) => p.chain(o =>
            interpValue(ctx, c.value)
                .map(value => set(
                  c.key.map(i => i.value).join('.'),
                  value, 
                  o))), pure({}));

const interpLiteral = (n: ast.Literal): Future<Type> =>
    pure(n.value);
