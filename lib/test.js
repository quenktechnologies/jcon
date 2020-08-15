"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tests = void 0;
exports.tests = {
    'should recognize booleans': 'testTrue = true testFalse = false',
    'should recognize lists': 'list = [1,"two", [3], {value=4}]',
    'should recognize dicts': 'object = { test = "yes" number = 2 }',
    'should recognize strings': 'string = "this is a 中文 string"',
    'should recognize module members': 'module.as.path = module/as/path#member',
    'should recognize org module members': 'either = @quenk/noni/lib/data/either#Either',
    'should recognize dotted paths': 'module.as.relative.path = ./module/with/relative/../path#member',
    'should recognize lists of members': 'array.of.modules = [one#default, ./path/to#member(), other/one#one]',
    'should recognize partially applied modules': 'call = module#func(1, 2, [3.3])',
    'should recognize empty partially applied modules': 'call = module#func()',
    'should recognize partially applied members': 'call = path/to/member#func(1, 2, [3])',
    'should recognize empty partially applied members': 'call = path/to/member#func()',
    'should recognize variables': 'env = $(value)',
    'should recognize environment variables': 'env = ${VALUE}',
    'should recognize comments': '-- This is a comment',
    'should recognize includes': 'include "some path"',
    'should allow complex dicts': "\n\n      complex.dict = {\n      \n      main = {\n       connector = path/to/connector#connector\n       options = {\n         \n \t collection = \"websessions\"\n\t autoRemove = \"interval\"\n\t autoRemoveInterval = ${AUTO_REMOVE_INTERVAL}\n\n       }\n\n    }\n   \n    }",
    'should all together now': "\n        \n  include \"path/to/file/a\"\n  include \"path/to/file/b\"\n\n  -- Opening comment.\n  -- Following comment.\n   id = ${ID}\n   name.first = \"F\"\n   name.last = \"L\"\n\n   -- Nothing on this line should be parsed. [1,2,3]\n   -- For real\n   app.connections.config = {\n\n       main = {\n\n        connector = path/to/connector#connect\n\n       }\n\n       backup = {\n\n        connector = path/to/connector#backup(1, 2, 3)\n\n       }\n\n   }\n  modules = [path#default, os#default, http#default ]\n  trap = trap#default()\n  ",
    'should allow filters on vars': 'test = $(avar|string)',
    'should allow filters on envars': 'test = ${ENVAR|number}',
    'should allow objects with paths': "\n\n   app.session.enable = true \n\n   app.session.options = {\n\n    secret = ${SESSION_SECRET}\n\n    name = \"sessionid\"\n\n    store.provider = @quenk/tendril-session-mongodb#session\n\n    store.options.uri = ${MONGO_URL}\n\n  }",
    'should allow string literal paths': "\n\n    \"app\" = {\n\n      session.\"key\".value = \"a key\"\n\n      \"session\".\"key\".\"name\" = \"key\"\n\n      \"session\".\"key\".enabled = true\n\n      \"session\".options = {\n\n         encryption = true\n\n       }\n      \n    } ",
    'should merge paths': "\n\n         path.to.a = \"this\"\n\n         path.to.b = \"that\"\n\n         path.to = {\n\n           c = \"c\"\n\n           d = \"d\"\n\n         }\n\n     path.to.e = \"e\""
};
//# sourceMappingURL=test.js.map