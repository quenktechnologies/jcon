"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var imports_1 = require("../imports");
var _1 = require("./");
/**
 * Pending file level context.
 *
 * This is the scope of a JCON file just before we process
 * its imports and includes.
 */
var Pending = /** @class */ (function () {
    function Pending(global, parser, loader) {
        this.global = global;
        this.parser = parser;
        this.loader = loader;
    }
    Pending.create = function (global, parser, loader) {
        return new Pending(global, parser, loader);
    };
    /**
     * descend one level of the Pending graph by following
     * the path of an include.
     *
     * Adjusts loaders to read paths relative to the path
     * passed.
     */
    Pending.prototype.descend = function (path) {
        return new Pending(this.global, this.parser, this.loader.create(path_1.dirname(path)));
    };
    /**
     * toFileContext turns a Pending context into a File context.
     */
    Pending.prototype.toFileContext = function (file) {
        return toFileContext(this, file);
    };
    return Pending;
}());
exports.Pending = Pending;
var toFileContext = function (ctx, file) {
    return imports_1.getFileImports(ctx.loader, file)
        .chain(function (imports) {
        return getIncludes(ctx, file)
            .map(function (includes) { return promote(ctx, file, includes, imports); });
    });
};
var getIncludes = function (ctx, f) {
    return future_1.parallel(f.includes.map(getInclude(ctx)));
};
var getInclude = function (ctx) { return function (i) {
    return loadFile(ctx, include2Path(i))
        .chain(function (file) { return toFileContext(ctx.descend(include2Path(i)), file); });
}; };
var loadFile = function (ctx, path) {
    return ctx
        .loader
        .loadFile(path)
        .chain(ctx.parser);
};
var include2Path = function (include) {
    return include.path.value;
};
var promote = function (p, file, inc, imp) {
    return new _1.FileContext(file, inc, imp, p.global);
};
//# sourceMappingURL=pending.js.map