
/**
 * Node is the common interface all members of the AST implement.
 */
export abstract class Node {

    /**
     * type of the Node.
     */
   abstract type: string;

    /**
     * location in the source text where the node was parsed from.
     */
    abstract location: Location;

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
 * Represents the entire contents of the source text.
 * The source text of a jcon file is meant to be compiled to 
 * a single ES object.
 */
export class File extends Node {

    type = 'file';

    constructor(
        public includes: Include[],
        public directives: Directive[],
        public location: Location) { super(); }

}

/**
 * Include node.
 * 
 * Indicates a path to resolve and parse into the current context.
 */
export class Include extends Node {

    type = 'include';

    constructor(public path: string, public location: Location) { super(); }

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
export class Comment extends Node {

    type = 'comment';

    constructor(public value: string, public location: Location) { super(); }

}

/**
 * Property node.
 *
 * A property in a jcon file is simply a top level key value pair.
 */
export class Property extends Node {

    type = 'property'

    constructor(
        public path: Identifier[],
        public value: Value,
        public location: Location) { super(); }

}

/**
 * Value are those nodes that can legally appear on the right-hand side of a
 * Property pair.
 */
export type Value
    = Module
    | EnvVar
    | List
    | Dict
    | StringLiteral
    | NumberLiteral
    | BooleanLiteral
    ;

/**
 * Member node.
 *
 * This node indicates the use of a member from a node module.
 * A member could be a path to an identifier or the result of
 * calling one.
 */
export class Member extends Node {

    type = 'member';

    constructor(
        public module: Module | Identifier,
        public member: Identifier,
        public invocation: boolean,
        public parameters: Value[],
        public location: Location) { super(); }

}

/**
 * EnvVar node.
 *
 * Indicates a reference to an environment variable.
 */
export class EnvVar extends Node {

    type = 'env-var';

    constructor(
        public key: Identifier,
        public location: Location) { super(); }

}

/**
 * List node.
 */
export class List extends Node {

    type = 'list';

    constructor(public elements: Value[], public location: Location) { super(); }

}

/**
 * Dict node.
 */
export class Dict extends Node {

    type = 'dict';

    constructor(public properties: Pair[], public location: Location) { super(); }

}

/**
 * Pair node.
 */
export class Pair extends Node {

    type = 'pair';

    constructor(
        public key: Identifier,
        public value: Value,
        public location: Location) { super(); }

}

/**
 * StringLiteral node.
 */
export class StringLiteral extends Node {

    type = 'string-literal';

    constructor(
        public value: string,
        public location: Location) { super(); }


}

/**
 * BooleanLiteral node.
 */
export class BooleanLiteral extends Node {

    type = 'boolean-literal';

    constructor(public value: string, public location: Location) { super(); }

}

/**
 * NumberLiteral node.
 */
export class NumberLiteral extends Node {

    type = 'number-literal';

    constructor(public value: string, public location: Location) { super(); }

}

/**
 * Module node.
 */
export class Module extends Node {

    type = 'module';

    constructor(public module: string, public location: Location) { super(); }

}

/**
 * Identifier node.
 */
export class Identifier {

    type = 'identifier';

    constructor(public value: string, public location: Location) { }

}
