/**
 * Nodes map.
 */
export interface Nodes<N extends Node> {
    [key: string]: N;
}
/**
 * Node is the common interface all members of the AST implement.
 */
export declare abstract class Node {
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
    [key: string]: string | number;
}
/**
 * File node.
 *
 * Represents the entire contents of the source text.
 * The source text of a jcon file is meant to be compiled to
 * a single ES object.
 */
export declare class File extends Node {
    includes: Include[];
    directives: Directive[];
    location: Location;
    type: string;
    constructor(includes: Include[], directives: Directive[], location: Location);
}
/**
 * Include node.
 *
 * Indicates a path to resolve and parse into the current context.
 */
export declare class Include extends Node {
    path: string;
    location: Location;
    type: string;
    constructor(path: string, location: Location);
}
/**
 * Directive found in a file's source text.
 */
export declare type Directive = Comment | Property;
/**
 * Comment node.
 *
 * A line of text prefixed with a '#';
 */
export declare class Comment extends Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * Property node.
 *
 * A property in a jcon file is simply a top level key value pair.
 */
export declare class Property extends Node {
    path: Identifier[];
    value: Value;
    location: Location;
    type: string;
    constructor(path: Identifier[], value: Value, location: Location);
}
/**
 * Value are those nodes that can legally appear on the right-hand side of a
 * Property pair.
 */
export declare type Value = Module | EnvVar | List | Dict | StringLiteral | NumberLiteral | BooleanLiteral;
/**
 * Member node.
 *
 * This node indicates the use of a member from a node module.
 * A member could be a path to an identifier or the result of
 * calling one.
 */
export declare class Member extends Node {
    module: Module | Identifier;
    member: Identifier;
    invocation: boolean;
    parameters: Value[];
    location: Location;
    type: string;
    constructor(module: Module | Identifier, member: Identifier, invocation: boolean, parameters: Value[], location: Location);
}
/**
 * EnvVar node.
 *
 * Indicates a reference to an environment variable.
 */
export declare class EnvVar extends Node {
    key: Identifier;
    location: Location;
    type: string;
    constructor(key: Identifier, location: Location);
}
/**
 * List node.
 */
export declare class List extends Node {
    elements: Value[];
    location: Location;
    type: string;
    constructor(elements: Value[], location: Location);
}
/**
 * Dict node.
 */
export declare class Dict extends Node {
    properties: Pair[];
    location: Location;
    type: string;
    constructor(properties: Pair[], location: Location);
}
/**
 * Pair node.
 */
export declare class Pair extends Node {
    key: Identifier;
    value: Value;
    location: Location;
    type: string;
    constructor(key: Identifier, value: Value, location: Location);
}
/**
 * StringLiteral node.
 */
export declare class StringLiteral extends Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * BooleanLiteral node.
 */
export declare class BooleanLiteral extends Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * NumberLiteral node.
 */
export declare class NumberLiteral extends Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * Module node.
 */
export declare class Module extends Node {
    module: string;
    location: Location;
    type: string;
    constructor(module: string, location: Location);
}
/**
 * Identifier node.
 */
export declare class Identifier {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
