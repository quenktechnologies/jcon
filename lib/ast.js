"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * File node.
 *
 * Represents the entire contents of the source text.
 * The source text of a jcon file is meant to be compiled to
 * a single ES object.
 */
var File = /** @class */ (function () {
    function File(includes, directives, location) {
        this.includes = includes;
        this.directives = directives;
        this.location = location;
        this.type = 'file';
    }
    return File;
}());
exports.File = File;
/**
 * Include node.
 *
 * Indicates a path to resolve and parse into the current context.
 */
var Include = /** @class */ (function () {
    function Include(path, location) {
        this.path = path;
        this.location = location;
        this.type = 'include';
    }
    return Include;
}());
exports.Include = Include;
/**
 * Comment node.
 *
 * A line of text prefixed with a '#';
 */
var Comment = /** @class */ (function () {
    function Comment(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'comment';
    }
    return Comment;
}());
exports.Comment = Comment;
/**
 * Property node.
 *
 * A property in a jcon file is simply a top level key value pair.
 */
var Property = /** @class */ (function () {
    function Property(path, value, location) {
        this.path = path;
        this.value = value;
        this.location = location;
        this.type = 'property';
    }
    return Property;
}());
exports.Property = Property;
/**
 * Member node.
 *
 * This node indicates the use of a member from a node module.
 * A member could be a path to an identifier or the result of
 * calling one.
 */
var Member = /** @class */ (function () {
    function Member(module, member, invocation, parameters, location) {
        this.module = module;
        this.member = member;
        this.invocation = invocation;
        this.parameters = parameters;
        this.location = location;
        this.type = 'member';
    }
    return Member;
}());
exports.Member = Member;
/**
 * EnvVar node.
 *
 * Indicates a reference to an environment variable.
 */
var EnvVar = /** @class */ (function () {
    function EnvVar(key, location) {
        this.key = key;
        this.location = location;
        this.type = 'env-var';
    }
    return EnvVar;
}());
exports.EnvVar = EnvVar;
/**
 * List node.
 */
var List = /** @class */ (function () {
    function List(elements, location) {
        this.elements = elements;
        this.location = location;
        this.type = 'list';
    }
    return List;
}());
exports.List = List;
/**
 * Dict node.
 */
var Dict = /** @class */ (function () {
    function Dict(properties, location) {
        this.properties = properties;
        this.location = location;
        this.type = 'dict';
    }
    return Dict;
}());
exports.Dict = Dict;
/**
 * Pair node.
 */
var Pair = /** @class */ (function () {
    function Pair(key, value, location) {
        this.key = key;
        this.value = value;
        this.location = location;
        this.type = 'pair';
    }
    return Pair;
}());
exports.Pair = Pair;
/**
 * StringLiteral node.
 */
var StringLiteral = /** @class */ (function () {
    function StringLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'string-literal';
    }
    return StringLiteral;
}());
exports.StringLiteral = StringLiteral;
/**
 * BooleanLiteral node.
 */
var BooleanLiteral = /** @class */ (function () {
    function BooleanLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'boolean-literal';
    }
    return BooleanLiteral;
}());
exports.BooleanLiteral = BooleanLiteral;
/**
 * NumberLiteral node.
 */
var NumberLiteral = /** @class */ (function () {
    function NumberLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'number-literal';
    }
    return NumberLiteral;
}());
exports.NumberLiteral = NumberLiteral;
/**
 * Module node.
 */
var Module = /** @class */ (function () {
    function Module(module, location) {
        this.module = module;
        this.location = location;
        this.type = 'module';
    }
    return Module;
}());
exports.Module = Module;
/**
 * Identifier node.
 */
var Identifier = /** @class */ (function () {
    function Identifier(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'identifier';
    }
    return Identifier;
}());
exports.Identifier = Identifier;
//# sourceMappingURL=ast.js.map