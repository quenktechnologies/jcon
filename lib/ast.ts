/**
 * Nodes map.
 */
export interface Nodes<N extends Node> {

    [key: string]: Constructor<N>;

}

/**
 * Constructor function for a generic node.
 */
export interface Constructor<N extends Node> {

    new(...p: any[]): N

}

/**
 * Node is the common interface all members of the AST implement.
 */
export interface Node {

    /**
     * type of the Node.
     */
    type: string;

    /**
     * location in the source text where the node was parsed from.
     */
    location: Location;

}

/**
 * Location indicates the location of a Node in source text. 
 */
export interface Location {

    [key: string]: string | number

};

/**
 * File node.
 *
 * Represents the entire parsed source text.
 * The source text of a jcon file is meant to be compiled to 
 * a single ES object.
 */
export class File {

    type = 'file';

    constructor(
        public includes: Include[],
        public directives: Directive[],
        public location: Location) { }

}

/**
 * Include node.
 * 
 * Indicates a path to resolve and parse into the current context.
 */
export class Include {

    type = 'include';

    constructor(public path: StringLiteral, public location: Location) { }

}

/**
 * Directive found in a file's source text.
 */
export type Directive = Comment | Property;

/**
 * Comment node.
 *
 * A line of text prefixed with a '#';
 */
export class Comment {

    type = 'comment';

    constructor(public value: string, public location: Location) { }

}

/**
 * PathName of a top level or dict property.
 * 
 * These can be chained together for dot notation.
 */
export type PathName = Identifier | StringLiteral;

/**
 * Property node.
 *
 * A property in a jcon file is simply a top level key value pair.
 */
export class Property {

    type = 'property'

    constructor(
        public path: PathName[],
        public value: Value,
        public location: Location) { }

}

/**
 * Value are those nodes that can legally appear on the right-hand side of a
 * property pair.
 */
export type Value
    = Member
    | Var
    | EnvVar
    | List
    | Dict
    | Literal
    ;

/**
 * Member node.
 *
 * This node indicates the use of a member from a node module.
 * A member could be a path to an identifier or the result of
 * calling one.
 */
export class Member {

    type = 'member';

    constructor(
        public module: Module,
        public member: Identifier,
        public invocation: boolean,
        public parameters: Value[],
        public location: Location) { }

}

/**
 * Var node.
 *
 * References a variable in the scope of conf file.
 */
export class Var {

    type = 'var';

    constructor(
        public key: Identifier,
        public filters: Filter[],
        public location: Location) { }

}

/**
 * EnvVar node.
 *
 * Indicates a reference to an environment variable.
 */
export class EnvVar {

    type = 'env-var';

    constructor(
        public key: Identifier,
        public filters: Filter[],
        public location: Location) { }

}

/**
 * Filter node.
 *
 * Indicates functions that should be applied to a variable before use.
 */
export class Filter {

    type = 'filter';

    constructor(
        public name: Identifier,
        public location: Location) { }

}

/**
 * List node.
 */
export class List {

    type = 'list';

    constructor(public elements: Value[], public location: Location) { }

}

/**
 * Dict node.
 */
export class Dict {

    type = 'dict';

    constructor(public properties: Pair[], public location: Location) { }

}

/**
 * Pair node.
 */
export class Pair {

    type = 'pair';

    constructor(
        public key: PathName[],
        public value: Value,
        public location: Location) { }

}

/**
 * Literal value types.
 */
export type Literal
    = StringLiteral
    | NumberLiteral
    | BooleanLiteral
    ;

/**
 * StringLiteral node.
 */
export class StringLiteral {

    type = 'string-literal';

    constructor(
        public value: string,
        public location: Location) { }


}

/**
 * BooleanLiteral node.
 */
export class BooleanLiteral {

    type = 'boolean-literal';

    constructor(public value: string, public location: Location) { }

}

/**
 * NumberLiteral node.
 */
export class NumberLiteral {

    type = 'number-literal';

    constructor(public value: string, public location: Location) { }

}

/**
 * Module node.
 */
export class Module {

    type = 'module';

    constructor(public module: string, public location: Location) { }

}

/**
 * Identifier node.
 */
export class Identifier {

    type = 'identifier';

    constructor(public value: string, public location: Location) { }

}
