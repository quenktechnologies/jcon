"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newContext = void 0;
var file_system_1 = require("../loader/file-system");
var parser_1 = require("../parser");
/**
 * newContext generates the default Global context for
 * node environments.
 */
var newContext = function (path) { return ({
    loader: new file_system_1.FileSystemLoader(path),
    parsers: {
        jcon: parser_1.parser
    },
    functions: {
        number: Number,
        string: String,
        boolean: Boolean,
        date: Date
    },
    env: process.env
}); };
exports.newContext = newContext;
//# sourceMappingURL=node.js.map