/// <reference path='Parser.d.ts' />
import * as os from 'os';
import * as nodes from './Node';
import Parser = require('./Parser');
import property from 'property-seek';

export { Node as Node } from './Node';

export interface AST {

    [key: string]: nodes.Node

}

export interface Context {

    symbols: SymbolTable;
    output: string[];

}

export interface SymbolTable {

    [key: string]: Variable

}

export class Variable {

    constructor(public id: string) { }

}

export const parse = (str: string, ast: AST = <any>nodes): nodes.File => {

    Parser.parser.yy = { ast };
    return Parser.parser.parse(str);

}

export const code = (n: nodes.Node): string => {

    if (n instanceof nodes.File) {

        let o: { [key: string]: string } = n.directives.reduce((p, d) =>
            property(code(d.path), code(d.value), p), {});

        let print = (o: any): string => (typeof o === 'object') ? `{${
            Object
                .keys(o)
                .map(k => `  ${k}: ${typeof (o[k]) === 'object' ? print(o[k]) : o[k]}`)
                .join(',' + os.EOL)}}` : o;

        return `export default ${print(o)}`;

    } else if (n instanceof nodes.Path) {

        return `${code(n.target)}.${code(n.id)}`;

    } else if (n instanceof nodes.Module) {

        return `require('${n.module}').${n.member}`;

    } else if (n instanceof nodes.EnvVar) {

        return `process.env['${n.key}']`;

    } else if (n instanceof nodes.List) {

        let members = n.members.map(code).join(',');

        return `[${members}]`;

    } else if (n instanceof nodes.Dict) {

        let properties = n.properties.map(code).join(',');

        return `{ ${properties} } `;

    } else if (n instanceof nodes.KVP) {

        let key = code(n.key);
        let value = code(n.value);

        return `${key} : ${value} `;

    } else if (n instanceof nodes.StringLiteral) {

        return `'${n.value}'`;

    } else if (n instanceof nodes.BooleanLiteral) {

        return n.value;

    } else if (n instanceof nodes.NumberLiteral) {

        return n.value;

    } else if (n instanceof nodes.Identifier) {

        return n.value;

    } else {

        throw new TypeError(`Unexpected type ${typeof n
            }, '${n}'!`);

    }

}

export const compile = (src: string): string => `${code(parse(src))} `;
