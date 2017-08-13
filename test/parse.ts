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
object = { test = 'yes' number = 2 }
array = [1, 2, 3]
tendrill.app.views.engine = tenhub-server/views/Engine

tendrill.app.connections = {
   
    main = {
        
       connector = (connector from tenhub-server/connectors/mongodb)
       options = {

 	 collection = "websessions"
	 autoRemove = "interval"
	 autoRemoveInterval = \${AUTO_REMOVE_INTERVAL}

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
