"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpValue = exports.interpValues = exports.interpDirective = exports.interpFile = exports.interp = void 0;
var ast = require("../ast");
var path_1 = require("@quenk/noni/lib/data/record/path");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var record_1 = require("@quenk/noni/lib/data/record");
var match_1 = require("@quenk/noni/lib/control/match");
var pending_1 = require("./context/file/pending");
/**
 * interp source text into an Output object.
 */
exports.interp = function (ctx, src) {
    return ctx.parsers.jcon(src)
        .chain(mkFileContext(ctx))
        .chain(function (c) { return exports.interpFile(c, c.file); });
};
var mkFileContext = function (ctx) { return function (file) {
    return pending_1.Pending
        .create(ctx, ctx.parsers.jcon, ctx.loader)
        .toFileContext(file)
        .map(function (c) { return c.union(); });
}; };
/**
 * interpFile
 */
exports.interpFile = function (ctx, f) {
    return future_1.parallel(f.directives.map(function (d) { return exports.interpDirective(ctx, d); }))
        .map(function (list) { return list.reduce(function (p, c) { return record_1.rmerge(p, c); }, {}); });
};
/**
 * interpDirective node into Output.
 *
 * Note: Comment directives are effectively ignored.
 */
exports.interpDirective = function (ctx, d) {
    return (d instanceof ast.Property) ?
        interpProperty(ctx, d) :
        future_1.pure({});
};
var interpProperty = function (ctx, p) {
    return exports.interpValue(ctx, p.value)
        .chain(function (value) { return future_1.pure(path_1.set(flatPath(p.path), value, {})); });
};
var flatPath = function (path) {
    return path.map(function (p) { return p.value; }).join('.');
};
/**
 * interpValues
 */
exports.interpValues = function (ctx, vals) {
    return future_1.sequential(vals.map(function (v) { return exports.interpValue(ctx, v); }));
};
/**
 * interpValue node into a Type.
 */
exports.interpValue = function (ctx, val) {
    return match_1.match(val)
        .caseOf(ast.Member, interpMember(ctx))
        .caseOf(ast.EnvVar, interpVar(ctx))
        .caseOf(ast.EnvVar, interpEnvVar(ctx))
        .caseOf(ast.List, interpList(ctx))
        .caseOf(ast.Dict, dict2TS(ctx))
        .caseOf(ast.StringLiteral, interpLiteral)
        .caseOf(ast.NumberLiteral, interpLiteral)
        .caseOf(ast.BooleanLiteral, interpLiteral)
        .caseOf(ast.Identifier, interpLiteral)
        .end();
};
var interpMember = function (ctx) { return function (m) {
    var id = m.module.module;
    var member = m.member.value;
    if (m.invocation) {
        try {
            var f_1 = ctx.imports[id][member];
            return future_1.parallel(m.parameters.map(function (v) { return exports.interpValue(ctx, v); }))
                .map(function (params) { return f_1.apply(null, params); });
        }
        catch (e) {
            return future_1.raise(new Error("Error while invoking module " +
                ("\"" + m.module.module + "#" + m.member.value + "\": \n") + e.stack));
        }
    }
    else {
        return future_1.pure(ctx.imports[id][member]);
    }
}; };
var interpVar = function (_) { return function (_) { return future_1.pure(""); }; };
var interpEnvVar = function (ctx) { return function (e) {
    return future_1.pure(ctx.global.env[e.key.value]);
}; };
var interpList = function (ctx) { return function (l) {
    return future_1.parallel(l.elements.map(function (e) { return exports.interpValue(ctx, e); }));
}; };
var dict2TS = function (ctx) { return function (d) {
    return d
        .properties
        .reduce(function (p, c) { return p.chain(function (o) {
        return exports.interpValue(ctx, c.value)
            .map(function (value) { return path_1.set(c.path.map(function (i) { return i.value; }).join('.'), value, o); });
    }); }, future_1.pure({}));
}; };
var interpLiteral = function (n) {
    return future_1.pure(n.value);
};
//# sourceMappingURL=index.js.map