
# JCON

JavaScript Configuration Object Notation (JCON) is a JSON inspired syntax for
configuration files in ECMAScript programs. 

This module provides a parser and interpreter for the language.

## Syntax

A single JCON file is can be thought of as an object literal without the opening
and closing braces.

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

A property is a key value pair that occurs within the file or a nested 
dict(ionary). The key part is a sequence of one or more identifiers separated 
by a `.`. This is interpreted as the path to the value in the root object.

A value can be one of:
1. string
2. number
3. boolean
4. list
5. dictionary
6. module
7. context variables
8. environment variable

The key is separated from the value part via a single `=`, not a `:`. 
Example:

```jcon

   id = ${ID}
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
Strings are wrapped in double quotes `"`.

### Numbers
Numbers map directly to ECMAScript numbers.

### Booleans
Booleans are either the constant `true` or `false`.

### Lists

Lists are a sequence of comma separated values surrounded by square braces `[]`.
Example:

```jcon
this.is.a.list = [1, "two", /path/to#three]
```

### Dictonary

A dictionary is a set of key value pairs, similar to an ECMAScript object
literal. Key value pairs are denoted the same way as properties. 
Example:

```jcon
dict = {

  name = "Oxford's Dictionary"
  isdn = "meh"

}
```

### Modules

Modules indicate a value comes from a node module file. 
The syntax allows for any single member of a module to be referenced as well as optionally invoked with arguments.

A module is simply a path to be resolved followed by the '#' symbol and
an identifier. The identifier must be the name of the desired export member.

If this member is to be invoked (called/applied) then a tuple of values may
be appended (with no space in between). Example:

```jcon
-- Without invocation
member = ./path/to/my/module#member

-- With invocation
other = ./path/to/my/other#member()

-- With arguments
client = connect-mongo#(express-session#default,{options:true})
```
### Context Variables
A context variable allows a variable to be referenced from the enclosing
context. A context variable has the following syntax where "variable" will
be the referenced variable's name:

```jcon
 value = $(variable)
```
The actual value or availiblity of the variable is determined by the 
implementation.

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
