"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_system_1 = require("./context/loader/file-system");
var parser_1 = require("./context/parser");
exports.newContext = function (path) { return ({
    loader: new file_system_1.FileSystemLoader(path),
    parsers: {
        jcon: parser_1.parser
    },
    env: process.env
}); };
//# sourceMappingURL=node.js.map