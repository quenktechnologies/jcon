"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_system_1 = require("../loader/file-system");
var parser_1 = require("../parser");
/**
 * newContext generates the default Global context for
 * node environments.
 */
exports.newContext = function (path) { return ({
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
//# sourceMappingURL=node.js.map