"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = exports.Module = exports.NumberLiteral = exports.BooleanLiteral = exports.StringLiteral = exports.Dict = exports.List = exports.Function = exports.Filter = exports.EnvVar = exports.Var = exports.Member = exports.Property = exports.Comment = exports.Include = exports.File = void 0;
;
/**
 * File node.
 *
 * Represents the entire parsed source text.
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
 * Var node.
 *
 * References a variable in the scope of conf file.
 */
var Var = /** @class */ (function () {
    function Var(key, filters, location) {
        this.key = key;
        this.filters = filters;
        this.location = location;
        this.type = 'var';
    }
    return Var;
}());
exports.Var = Var;
/**
 * EnvVar node.
 *
 * Indicates a reference to an environment variable.
 */
var EnvVar = /** @class */ (function () {
    function EnvVar(key, filters, location) {
        this.key = key;
        this.filters = filters;
        this.location = location;
        this.type = 'env-var';
    }
    return EnvVar;
}());
exports.EnvVar = EnvVar;
/**
 * Filter node.
 *
 * Indicates functions that should be applied to a variable before use.
 */
var Filter = /** @class */ (function () {
    function Filter(name, location) {
        this.name = name;
        this.location = location;
        this.type = 'filter';
    }
    return Filter;
}());
exports.Filter = Filter;
/**
 * Function node.
 *
 * (Not used, needed by the tdc tool).
 */
var Function = /** @class */ (function () {
    function Function(body, location) {
        this.body = body;
        this.location = location;
        this.type = 'arrow-function';
    }
    return Function;
}());
exports.Function = Function;
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