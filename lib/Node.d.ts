export interface Node {
    type: string;
    location: Location;
}
export interface Location {
    [key: string]: string | number;
}
export declare class File {
    directives: Directive[];
    location: Location;
    type: string;
    constructor(directives: Directive[], location: Location);
}
export declare class Directive {
    path: Identifier | Path;
    value: Value;
    location: Location;
    type: string;
    constructor(path: Identifier | Path, value: Value, location: Location);
}
export declare class Path {
    target: Identifier | Path;
    id: Identifier;
    location: Location;
    type: string;
    constructor(target: Identifier | Path, id: Identifier, location: Location);
}
export declare type Value = Module | EnvVar | List | Dict | StringLiteral | NumberLiteral | BooleanLiteral;
export declare class Module {
    member: Identifier;
    module: string;
    location: Location;
    type: string;
    constructor(member: Identifier, module: string, location: Location);
}
export declare class EnvVar {
    key: string;
    location: Location;
    type: string;
    constructor(key: string, location: Location);
}
export declare class List {
    members: Value[];
    location: Location;
    type: string;
    constructor(members: Value[], location: Location);
}
export declare class Dict {
    properties: KVP[];
    location: Location;
    type: string;
    constructor(properties: KVP[], location: Location);
}
export declare class KVP {
    key: Identifier;
    value: Value;
    location: Location;
    type: string;
    constructor(key: Identifier, value: Value, location: Location);
}
export declare class StringLiteral {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
export declare class BooleanLiteral {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
export declare class NumberLiteral {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
export declare class Identifier {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
