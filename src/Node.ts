
export interface Node {

    type: string
    location: Location

}

export interface Location {

    [key: string]: string | number

};

export class File {

    type = 'file';

    constructor(public directives: Directive[], public location: Location) { }

}

export class Directive {

    type = 'directive'

    constructor(public path: Identifier | Path, public value: Value, public location: Location) { }

}

export class Path {

    type = 'path';

    constructor(public target: Identifier | Path, public id: Identifier, public location: Location) { }

}

export type Value
    = Module
    | EnvVar
    | List
    | Dict
    | StringLiteral
    | NumberLiteral
    | BooleanLiteral
    ;

export class Module {

    type = 'module';

    constructor(public member: Identifier, public module: string, public location: Location) { }

}

export class EnvVar {

    type = 'env-var';

    constructor(public key: string, public location: Location) { }

}

export class List {

    type = 'list';
    constructor(public members: Value[], public location: Location) {

    }

}

export class Dict {

    type = 'dict';
    constructor(public properties: KVP[], public location: Location) { }

}

export class KVP {

    type = 'kvp';

    constructor(public key: Identifier, public value: Value, public location: Location) { }

}

export class StringLiteral {

    type = 'string';

    constructor(public value: string, public location: Location) { }


}

export class BooleanLiteral {

    type = 'boolean-literal';

    constructor(public value: string, public location: Location) { }

}

export class NumberLiteral {

    type = 'number-literal';
    constructor(public value: string, public location: Location) { }

}

export class Identifier {

    type = 'identifier';

    constructor(public value: string, public location: Location) { }

}
