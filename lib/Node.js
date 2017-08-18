"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var File = (function () {
    function File(directives, location) {
        this.directives = directives;
        this.location = location;
        this.type = 'file';
    }
    return File;
}());
exports.File = File;
var Directive = (function () {
    function Directive(path, value, location) {
        this.path = path;
        this.value = value;
        this.location = location;
        this.type = 'directive';
    }
    return Directive;
}());
exports.Directive = Directive;
var Path = (function () {
    function Path(target, id, location) {
        this.target = target;
        this.id = id;
        this.location = location;
        this.type = 'path';
    }
    return Path;
}());
exports.Path = Path;
var Module = (function () {
    function Module(member, module, args, location) {
        this.member = member;
        this.module = module;
        this.args = args;
        this.location = location;
        this.type = 'module';
    }
    return Module;
}());
exports.Module = Module;
var EnvVar = (function () {
    function EnvVar(key, location) {
        this.key = key;
        this.location = location;
        this.type = 'env-var';
    }
    return EnvVar;
}());
exports.EnvVar = EnvVar;
var List = (function () {
    function List(members, location) {
        this.members = members;
        this.location = location;
        this.type = 'list';
    }
    return List;
}());
exports.List = List;
var Dict = (function () {
    function Dict(properties, location) {
        this.properties = properties;
        this.location = location;
        this.type = 'dict';
    }
    return Dict;
}());
exports.Dict = Dict;
var KVP = (function () {
    function KVP(key, value, location) {
        this.key = key;
        this.value = value;
        this.location = location;
        this.type = 'kvp';
    }
    return KVP;
}());
exports.KVP = KVP;
var StringLiteral = (function () {
    function StringLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'string';
    }
    return StringLiteral;
}());
exports.StringLiteral = StringLiteral;
var BooleanLiteral = (function () {
    function BooleanLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'boolean-literal';
    }
    return BooleanLiteral;
}());
exports.BooleanLiteral = BooleanLiteral;
var NumberLiteral = (function () {
    function NumberLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'number-literal';
    }
    return NumberLiteral;
}());
exports.NumberLiteral = NumberLiteral;
var Identifier = (function () {
    function Identifier(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'identifier';
    }
    return Identifier;
}());
exports.Identifier = Identifier;
//# sourceMappingURL=Node.js.map