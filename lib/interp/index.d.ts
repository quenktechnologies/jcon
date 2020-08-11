import * as ast from '../ast';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { FileContext } from './context/file';
import { Global } from './context/global';
import { Output } from './output';
/**
 * Type
 */
export declare type Type = any;
/**
 * interp source text into an Output object.
 */
export declare const interp: (ctx: Global, src: string) => Future<Output>;
/**
 * interpFile
 */
export declare const interpFile: (ctx: FileContext, f: ast.File) => Future<Output>;
/**
 * interpDirective node into Output.
 *
 * Note: Comment directives are effectively ignored.
 */
export declare const interpDirective: (ctx: FileContext, d: ast.Directive) => Future<Output>;
/**
 * interpValues
 */
export declare const interpValues: (ctx: FileContext, vals: ast.Value[]) => Future<Type[]>;
/**
 * interpValue node into a Type.
 */
export declare const interpValue: (ctx: FileContext, val: ast.Value) => Future<Type>;
