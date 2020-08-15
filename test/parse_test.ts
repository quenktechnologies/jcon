import * as must from 'must';
import * as fs from 'fs';

import { tests } from '../lib/test';
import { parse } from '../lib';

function json(tree: any): string {

    return JSON.stringify(tree);

}

function compare(tree: any, that: any): void {

    must(tree).eql(that);

}

function makeTest(test, index) {

    var file = index.replace(/\s/g, '-');

    if (process.env.GENERATE) {

        return parse(test)
            .map(json)
            .map(txt => fs.writeFileSync(`./test/expectations/${file}.json`, txt))
            .orRight((e: Error) => { throw e; });

    }

    if (!test.skip) {

        parse(test)
            .map(json)
            .map(txt =>
                compare(txt,
                    fs.readFileSync(`./test/expectations/${file}.json`, {
                        encoding: 'utf8'
                    })))
            .orRight((e: Error) => { throw e; });

    }

}

describe('Parser', function() {

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
