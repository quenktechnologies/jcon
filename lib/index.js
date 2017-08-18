"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='Parser.d.ts' />
var os = require("os");
var nodes = require("./Node");
var Parser = require("./Parser");
var property_seek_1 = require("property-seek");
var Variable = (function () {
    function Variable(id) {
        this.id = id;
    }
    return Variable;
}());
exports.Variable = Variable;
exports.parse = function (str, ast) {
    if (ast === void 0) { ast = nodes; }
    Parser.parser.yy = { ast: ast };
    return Parser.parser.parse(str);
};
exports.code = function (n) {
    if (n instanceof nodes.File) {
        if (n.directives.length === 0)
            return '{}';
        var o = n.directives.reduce(function (p, d) {
            return property_seek_1.default(exports.code(d.path), exports.code(d.value), p);
        }, {});
        var print_1 = function (o) { return (typeof o === 'object') ? "{" + Object
            .keys(o)
            .map(function (k) { return "  " + k + ": " + (typeof (o[k]) === 'object' ? print_1(o[k]) : o[k]); })
            .join(',' + os.EOL) + "}" : o; };
        return print_1(o);
    }
    else if (n instanceof nodes.Path) {
        return exports.code(n.target) + "." + exports.code(n.id);
    }
    else if (n instanceof nodes.Module) {
        var args = n.args.map(function (a) { return exports.code(a); }).join(',');
        return "((function(m) { " +
            (" return " + (n.member ? 'm.' + n.member : 'm.default?m.default:m') + " })") +
            ("(require('" + n.module + "')" + (args ? '(' + args + ')' : '') + "))");
    }
    else if (n instanceof nodes.EnvVar) {
        return "process.env['" + n.key + "']";
    }
    else if (n instanceof nodes.List) {
        var members = n.members.map(exports.code).join(',');
        return "[" + members + "]";
    }
    else if (n instanceof nodes.Dict) {
        var properties = n.properties.map(exports.code).join(',');
        return "{ " + properties + " } ";
    }
    else if (n instanceof nodes.KVP) {
        var key = exports.code(n.key);
        var value = exports.code(n.value);
        return key + " : " + value + " ";
    }
    else if (n instanceof nodes.StringLiteral) {
        return "`" + n.value + "`";
    }
    else if (n instanceof nodes.BooleanLiteral) {
        return n.value;
    }
    else if (n instanceof nodes.NumberLiteral) {
        return n.value;
    }
    else if (n instanceof nodes.Identifier) {
        return n.value;
    }
    else {
        throw new TypeError("Unexpected type " + typeof n + ", '" + n + "'!");
    }
};
exports.compile = function (src) { return exports.code(exports.parse(src)) + " "; };
//# sourceMappingURL=index.js.map