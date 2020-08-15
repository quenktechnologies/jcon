
export const tests = {

    'should recognize booleans':
        `testTrue = true
   testFalse = false`,

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

    'should allow complex dicts':
        `complex.dict = {
   
    main = {
       connector = path/to/connector#connector
       options = {
         
 	 collection = "websessions"
	 autoRemove = "interval"
	 autoRemoveInterval = \${AUTO_REMOVE_INTERVAL}

       }

    }
   
}`,

    'should all together now':
        `
  include "path/to/file/a"
  include "path/to/file/b"

  -- Opening comment.
  -- Following comment.
   id = \${ID}
   name.first = "F"
   name.last = "L"

   -- Nothing on this line should be parsed. [1,2,3]
   -- For real
   app.connections.config = {

       main = {

        connector = path/to/connector#connect

       }

       backup = {

        connector = path/to/connector#backup(1, 2, 3)

       }

   }
  modules = [path#default, os#default, http#default ]
  trap = trap#default()
  `,
    'should allow filters on vars': 'test = $(avar|string)',

    'should allow filters on envars': 'test = ${ENVAR|number}',

    'should allow objects with paths': `

   app.session.enable = true 

   app.session.options = {

    secret = \${SESSION_SECRET}

    name = "sessionid"

    store.provider = @quenk/tendril-session-mongodb#session

    store.options.uri = \${MONGO_URL}

  }

  `,
    'should allow string literal paths': `

    "app" = {

      session."key".value = "a key"

      "session"."key"."name" = "key"

      "session"."key".enabled = true

      "session".options = {

         encryption = true

       }
      
    } `,

    'should merge paths': `

   path.to.a = "this"

   path.to.b = "that"

   path.to = {

    c = "c"

    d = "d"

   }

   path.to.e = "e"`

}
