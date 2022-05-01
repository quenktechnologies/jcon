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
var interp = function (ctx, src) {
    return ctx.parsers.jcon(src)
        .chain(mkFileContext(ctx))
        .chain(function (c) { return (0, exports.interpFile)(c, c.file); });
};
exports.interp = interp;
var mkFileContext = function (ctx) { return function (file) {
    return pending_1.Pending
        .create(ctx, ctx.parsers.jcon, ctx.loader)
        .toFileContext(file)
        .map(function (c) { return c.union(); });
}; };
/**
 * interpFile
 */
var interpFile = function (ctx, f) {
    return (0, future_1.parallel)(f.directives.map(function (d) { return (0, exports.interpDirective)(ctx, d); }))
        .map(function (list) { return list.reduce(function (p, c) { return (0, record_1.rmerge)(p, c); }, {}); });
};
exports.interpFile = interpFile;
/**
 * interpDirective node into Output.
 *
 * Note: Comment directives are effectively ignored.
 */
var interpDirective = function (ctx, d) {
    return (d instanceof ast.Property) ?
        interpProperty(ctx, d) :
        (0, future_1.pure)({});
};
exports.interpDirective = interpDirective;
var interpProperty = function (ctx, p) {
    return (0, exports.interpValue)(ctx, p.value)
        .chain(function (value) { return (0, future_1.pure)((0, path_1.set)(flatPath(p.path), value, {})); });
};
var flatPath = function (path) {
    return path.map(function (p) { return p.value; }).join('.');
};
/**
 * interpValues
 */
var interpValues = function (ctx, vals) {
    return (0, future_1.sequential)(vals.map(function (v) { return (0, exports.interpValue)(ctx, v); }));
};
exports.interpValues = interpValues;
/**
 * interpValue node into a Type.
 */
var interpValue = function (ctx, val) {
    return (0, match_1.match)(val)
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
exports.interpValue = interpValue;
var interpMember = function (ctx) { return function (m) {
    var id = m.module.module;
    var member = m.member.value;
    if (m.invocation) {
        try {
            var f_1 = ctx.imports[id][member];
            return (0, future_1.parallel)(m.parameters.map(function (v) { return (0, exports.interpValue)(ctx, v); }))
                .map(function (params) { return f_1.apply(null, params); });
        }
        catch (e) {
            return (0, future_1.raise)(new Error("Error while invoking module " +
                "\"".concat(m.module.module, "#").concat(m.member.value, "\": \n") +
                e.stack));
        }
    }
    else {
        return (0, future_1.pure)(ctx.imports[id][member]);
    }
}; };
var interpVar = function (_) { return function (_) { return (0, future_1.pure)(""); }; };
var interpEnvVar = function (ctx) { return function (e) {
    return (0, future_1.pure)(ctx.global.env[e.key.value]);
}; };
var interpList = function (ctx) { return function (l) {
    return (0, future_1.parallel)(l.elements.map(function (e) { return (0, exports.interpValue)(ctx, e); }));
}; };
var dict2TS = function (ctx) { return function (d) {
    return d
        .properties
        .reduce(function (p, c) { return p.chain(function (o) {
        return (0, exports.interpValue)(ctx, c.value)
            .map(function (value) { return (0, path_1.set)(c.path.map(function (i) { return i.value; }).join('.'), value, o); });
    }); }, (0, future_1.pure)({}));
}; };
var interpLiteral = function (n) {
    return (0, future_1.pure)(n.value);
};
//# sourceMappingURL=index.js.map