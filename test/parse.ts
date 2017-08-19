import * as must from 'must';
import * as fs from 'fs';
import { parse, compile } from '../src';

var input = null;
var tests = null;

function json(tree: any): string {
    return JSON.stringify(tree);
}

function compare(tree: any, that: any): void {

    must(tree).eql(that);

}

function makeTest(test, index) {

    var file = index.replace(/\s/g, '-');

    if (process.env.GENERATE) {
        fs.writeFileSync(`./test/expectations/${file}.json`, json(parse(test.input)));
        fs.writeFileSync(`./test/expectations/${file}.ts`, compile(test.input));
        return;
    }

    if (!test.skip) {

        compare(json(parse(test.input)), fs.readFileSync(`./test/expectations/${file}.json`, {
            encoding: 'utf8'
        }));

        compare(compile(test.input), fs.readFileSync(`./test/expectations/${file}.ts`, {
            encoding: 'utf8'
        }));

    }

}

tests = {

    'should work': {

        input: `

test = true
list = [1,'two', [3], {value=4}]
object = { test = 'yes' number = 2 }
module = module
module.as.path = module/as/path
module.as.relative.path = ./module/with/relative/../path
array.of.modules = [one, ./1/2/3, other/one|one]
call = $(funcs 1, 2, [3])
call.member = $(module/with/member|member {key="value"})

complex.dict = {
   
    main = {
       connector = path/to/connector|connector
       options = {
         
 	 collection = "websessions"
	 autoRemove = "interval"
	 autoRemoveInterval = ${'${AUTO_REMOVE_INTERVAL}'}

       }

    }
   
}

tendrill.app.filters.session.enabled = true
tendrill.app.filters.session.options = {httpOnly = true}
tendrill.filters.csrf.enabled = true

tendrill.app.modules = {

 www = lims/modules/www

} 
        `

    }

};

describe('Parser', function() {

    beforeEach(function() {

        input = null;

    });

    describe('parse()', function() {

        Object.keys(tests).forEach(k => {

            it(k, function() {

                if (Array.isArray(tests[k])) {

                    tests[k].forEach(makeTest);

                } else {

                    makeTest(tests[k], k);

                }

            });
        });

    });

});
