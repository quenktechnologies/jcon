"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Node is the common interface all members of the AST implement.
 */
var Node = /** @class */ (function () {
    function Node() {
    }
    return Node;
}());
exports.Node = Node;
;
/**
 * File node.
 *
 * Represents the entire contents of the source text.
 * The source text of a jcon file is meant to be compiled to
 * a single ES object.
 */
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File(includes, directives, location) {
        var _this = _super.call(this) || this;
        _this.includes = includes;
        _this.directives = directives;
        _this.location = location;
        _this.type = 'file';
        return _this;
    }
    return File;
}(Node));
exports.File = File;
/**
 * Include node.
 *
 * Indicates a path to resolve and parse into the current context.
 */
var Include = /** @class */ (function (_super) {
    __extends(Include, _super);
    function Include(path, location) {
        var _this = _super.call(this) || this;
        _this.path = path;
        _this.location = location;
        _this.type = 'include';
        return _this;
    }
    return Include;
}(Node));
exports.Include = Include;
/**
 * Comment node.
 *
 * A line of text prefixed with a '#';
 */
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment(value, location) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.location = location;
        _this.type = 'comment';
        return _this;
    }
    return Comment;
}(Node));
exports.Comment = Comment;
/**
 * Property node.
 *
 * A property in a jcon file is simply a top level key value pair.
 */
var Property = /** @class */ (function (_super) {
    __extends(Property, _super);
    function Property(path, value, location) {
        var _this = _super.call(this) || this;
        _this.path = path;
        _this.value = value;
        _this.location = location;
        _this.type = 'property';
        return _this;
    }
    return Property;
}(Node));
exports.Property = Property;
/**
 * Member node.
 *
 * This node indicates the use of a member from a node module.
 * A member could be a path to an identifier or the result of
 * calling one.
 */
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member(module, member, invocation, parameters, location) {
        var _this = _super.call(this) || this;
        _this.module = module;
        _this.member = member;
        _this.invocation = invocation;
        _this.parameters = parameters;
        _this.location = location;
        _this.type = 'member';
        return _this;
    }
    return Member;
}(Node));
exports.Member = Member;
/**
 * EnvVar node.
 *
 * Indicates a reference to an environment variable.
 */
var EnvVar = /** @class */ (function (_super) {
    __extends(EnvVar, _super);
    function EnvVar(key, location) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.location = location;
        _this.type = 'env-var';
        return _this;
    }
    return EnvVar;
}(Node));
exports.EnvVar = EnvVar;
/**
 * List node.
 */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(elements, location) {
        var _this = _super.call(this) || this;
        _this.elements = elements;
        _this.location = location;
        _this.type = 'list';
        return _this;
    }
    return List;
}(Node));
exports.List = List;
/**
 * Dict node.
 */
var Dict = /** @class */ (function (_super) {
    __extends(Dict, _super);
    function Dict(properties, location) {
        var _this = _super.call(this) || this;
        _this.properties = properties;
        _this.location = location;
        _this.type = 'dict';
        return _this;
    }
    return Dict;
}(Node));
exports.Dict = Dict;
/**
 * Pair node.
 */
var Pair = /** @class */ (function (_super) {
    __extends(Pair, _super);
    function Pair(key, value, location) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.value = value;
        _this.location = location;
        _this.type = 'pair';
        return _this;
    }
    return Pair;
}(Node));
exports.Pair = Pair;
/**
 * StringLiteral node.
 */
var StringLiteral = /** @class */ (function (_super) {
    __extends(StringLiteral, _super);
    function StringLiteral(value, location) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.location = location;
        _this.type = 'string-literal';
        return _this;
    }
    return StringLiteral;
}(Node));
exports.StringLiteral = StringLiteral;
/**
 * BooleanLiteral node.
 */
var BooleanLiteral = /** @class */ (function (_super) {
    __extends(BooleanLiteral, _super);
    function BooleanLiteral(value, location) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.location = location;
        _this.type = 'boolean-literal';
        return _this;
    }
    return BooleanLiteral;
}(Node));
exports.BooleanLiteral = BooleanLiteral;
/**
 * NumberLiteral node.
 */
var NumberLiteral = /** @class */ (function (_super) {
    __extends(NumberLiteral, _super);
    function NumberLiteral(value, location) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.location = location;
        _this.type = 'number-literal';
        return _this;
    }
    return NumberLiteral;
}(Node));
exports.NumberLiteral = NumberLiteral;
/**
 * Module node.
 */
var Module = /** @class */ (function (_super) {
    __extends(Module, _super);
    function Module(module, location) {
        var _this = _super.call(this) || this;
        _this.module = module;
        _this.location = location;
        _this.type = 'module';
        return _this;
    }
    return Module;
}(Node));
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