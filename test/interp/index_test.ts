import { must } from '@quenk/must';
import { toPromise, attempt } from '@quenk/noni/lib/control/monad/future';
import { writeTextFile, readTextFile } from '@quenk/noni/lib/io/file';
import { FileSystemLoader } from '../../src/interp/context/loader/file-system';
import { interp } from '../../src/interp';
import { parser as jcon } from '../../src/interp/context/parser';

const EXPECTATIONS = `${__dirname}/expectations`;

const tests = {

    'should interp dicts': 'a.dict = { id = 12 }',

    'should interp lists': 'a.list = [1, 2, 3]',

    'should interp strings': 'name.first = "Lasana" name.last = "Murray"',

    'should interp numbers': 'phone =  1',

    'should interp booleans (true)': 'isTrue = true',

    'should interp booleans (false)': 'isFalse = false',

    'should resolve module values': 'id = ./fixtures/modulec#init',

    'should allow includes': 'include "./fixtures/includea.jcon"',

    'should all together now': `

  include "./fixtures/includea.jcon"
  include "./fixtures/includex.jcon"

  -- Opening comment.
  -- Following comment.
   name.first = "F"
   name.last = "L"

   -- Nothing on this line should be parsed. [1,2,3]
   test.modules.count = 3
   
  `
};

const newContext = (path: string) => ({

    loader: new FileSystemLoader(path),

    parsers: {

        jcon

    },

    env: process.env

})
const compare = (tree: any, that: any) => {
    must(tree).equate(that);
}

const toString = (o: any) =>
    attempt(() => JSON.stringify(o));

const makeTest = (test, index) => {

    var file = index.replace(/\s/g, '-');

    if (process.env.GENERATE) {

        return interp(newContext(__dirname), test)
            .chain(toString)
            .chain(txt => writeTextFile(`${EXPECTATIONS}/${file}.json`, txt))
            .map(() => { });

    }

    if (!test.skip) {

        return interp(newContext(__dirname), test)
            .chain(o =>
                readTextFile(`${EXPECTATIONS}/${file}.json`)
                    .chain(buf => attempt(() => JSON.parse(buf)))
                    .map(fo => compare(o, fo)))
            .map(() => { });

    }

}

describe('interp', () => {

    describe('interp', () => {

        Object.keys(tests).forEach(k => {

            it(k, () => {

                return toPromise(makeTest(tests[k], k));

            });
        });

    });

});
