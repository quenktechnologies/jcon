
# JCON

JavaScript Configuration Object Notation (JCON) is a JSON inspired syntax for
configuration files in ECMAScript programs. This module provides a parser.

## Structure

A single JCON file is can be thought of as an object literal without the opening
and closing braces.

## Syntax

### Includes

Includes allow another JCON file to be included (merged) into the current 
file. Example:

```jcon
include "./something.jcon"
include "./other.jcon"
```
### Comments

JCON supports single line comments by placing a `--` token at the start of the 
like. Example:

```jcon
 -- This is a comment.
```

### Properties

A property is a key value pair that occurs within the file or nested dict(ionary).
The key part can be a sequence of identifiers separated by a `.`. If so,
it is seen as a path and should be expanded by the compiler.

The value part can be one of:
1. string
2. number
3. boolean
4. list
5. dictionary
6. module
7. environment variable

The key is separated from the value part via a single '='. Example:

```jcon

   id = \${ID}
   name.first = "Jane"
   name.last = "Doe"
   options.active = true
   options.trusted = false

   -- Nothing on this line should be parsed. [1,2,3]
   connections.config = {

       main = {

        connector = path/to/connector#connect

       }

       backup = {

        connector = path/to/connector#backup(1, 2, 3)

       }

   }

  modules = [path#default, os#default, http#default ]

```

### Strings
Strings must only be wrapped in double quotes `"`.

### Numbers
Numbers map directly to ECMAScript numbers.

### Booleans
Booleans are either the constant `true` or `false`.

### Lists

Lists are a sequence of comma separated values surronded by square braces `[]`.
Example:

```jcon
this.is.a.list = [1, "two", /path/to#three]
```

### Dictonary

A dictionary is a set of key value pairs, simillar to an ECMAScript object
literal. Key value pairs are denoted the same way as properties. Example:

```jcon
dict = {

  name = "Oxford's Dictionary"
  isdn = "meh"

}
```

### Modules

Modules indicate a value comes from some node module. The syntax allows for any
single member of a module to be reference as well as optionally invoked with
arguments.

A module is simply a path to be resolved followed by the '#' symbol and
an identifier. The identifier must be the name of the required export member
to sourcefrom the module. 

If this member is to be invoked (called/applied) then a tuple of values may
be appended (with no space in between). Example:

```jcon
-- Without invocation
member = ./path/to/my/module#member

-- With invocation
other = ./path/to/my/other#member()

-- With arguments
client = connect-mongo#(express-session#default)
```

### Environment Variables

Environment variables allow values to be read from `process.env`. An
environment variable looks like the following where `VALUE` is the actual
value read:

```jcon
-- This reads an env var.
value = ${VALUE}
```

## License

Apache 2.0 Quenk Technologies Limited © 2019.
