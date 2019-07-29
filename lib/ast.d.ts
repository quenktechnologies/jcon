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
    new (...p: any[]): N;
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
    [key: string]: string | number;
}
/**
 * File node.
 *
 * Represents the entire contents of the source text.
 * The source text of a jcon file is meant to be compiled to
 * a single ES object.
 */
export declare class File {
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
export declare class Include {
    path: StringLiteral;
    location: Location;
    type: string;
    constructor(path: StringLiteral, location: Location);
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
export declare class Comment {
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
export declare class Property {
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
export declare type Value = Member | Var | EnvVar | List | Dict | Literal | ArrowFunction;
/**
 * Member node.
 *
 * This node indicates the use of a member from a node module.
 * A member could be a path to an identifier or the result of
 * calling one.
 */
export declare class Member {
    module: Module;
    member: Identifier;
    invocation: boolean;
    parameters: Value[];
    location: Location;
    type: string;
    constructor(module: Module, member: Identifier, invocation: boolean, parameters: Value[], location: Location);
}
/**
 * Var node.
 *
 * References a variable in the scope of conf file.
 */
export declare class Var {
    key: Identifier;
    filters: Filter[];
    location: Location;
    type: string;
    constructor(key: Identifier, filters: Filter[], location: Location);
}
/**
 * EnvVar node.
 *
 * Indicates a reference to an environment variable.
 */
export declare class EnvVar {
    key: Identifier;
    filters: Filter[];
    location: Location;
    type: string;
    constructor(key: Identifier, filters: Filter[], location: Location);
}
/**
 * Filter node.
 *
 * Indicates functions that should be applied to a variable before use.
 */
export declare class Filter {
    name: Identifier;
    location: Location;
    type: string;
    constructor(name: Identifier, location: Location);
}
/**
 * List node.
 */
export declare class List {
    elements: Value[];
    location: Location;
    type: string;
    constructor(elements: Value[], location: Location);
}
/**
 * Dict node.
 */
export declare class Dict {
    properties: Pair[];
    location: Location;
    type: string;
    constructor(properties: Pair[], location: Location);
}
/**
 * Pair node.
 */
export declare class Pair {
    key: Identifier;
    value: Value;
    location: Location;
    type: string;
    constructor(key: Identifier, value: Value, location: Location);
}
/**
 * ArrowFunction node.
 *
 * (Not used, needed by the tdc tool).
 */
export declare class ArrowFunction {
    body: string;
    location: Location;
    type: string;
    constructor(body: string, location: Location);
}
/**
 * Literal value types.
 */
export declare type Literal = StringLiteral | NumberLiteral | BooleanLiteral;
/**
 * StringLiteral node.
 */
export declare class StringLiteral {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * BooleanLiteral node.
 */
export declare class BooleanLiteral {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * NumberLiteral node.
 */
export declare class NumberLiteral {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * Module node.
 */
export declare class Module {
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
