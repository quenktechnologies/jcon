# JCON

## License

Apache 2.0 Quenk Technologies Limited © 2019.

JavaScript Configuration Object Notation (JCON) is a JSON inspired syntax for
writing configuration files in ECMAScript programs. 

A single JCON file is can be thought of as an object literal without the 
surrounding opening and closing braces.

JCON files SHOULD be written in UTF-8 format. Programs parsing JCON text SHOULD
assume UTF-8 by default.

### Includes

Includes allow another JCON file to be included (merged) into the current 
file. Example:

```jcon
include "./something.jcon"
include "./other.jcon"
```

The contents of "./something.jcon" and "other.jcon" will be parsed and included
in the AST of the file they were included from.

### Comments

JCON supports single line comments by placing a `--` token at the start of the 
line.

Example:

```jcon
 -- This is a comment.
```

### Properties

A property is a key value pair that occurs within the file or a nested 
dict(ionary). The key part is a sequence of one or more identifiers separated 
by a `.`. This is interpreted as the path to the value in the containing object.

A value can be one of:
1. string
2. number
3. boolean
4. list
5. dictionary
6. member
7. context variable
8. environment variable

The key is separated from the value part via a single `=`, (not  `:`!). 
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

  modules = [ path#default, os#default, http#default ]

```

### Strings

A string is a sequence of zero or more characters wrapped in double quotes `"`.

#### Valid Characters

All Unicode code points may appear in a string EXCEPT for:

 * Backslash (U+005C)
 * Carriage Return (U+200D)
 * Line Separator (U+2028)
 * Paragraph Separator (U+2029)
 * Line Feed (U+000A)

with the exception of Backslash (U+005C) which MAY only appear as part of an
escape sequence or line continuation.

#### Escape Sequences

An Escape Sequence allows special characters and sequences to be entered into
a file. Escape Sequences must begin with a `\` (U+005C) followed by one or 
more code points that make up the sequence.

##### Single Character Escape Sequences

The following are valid single character escape sequences:
* \" (Quote)
* \\ (U+005C Backslash)
* \b (U+0008 Backspace)
* \f (U+000C Form Feed)
* \n (U+000A Line Feed)
* \r (U+000D Carriage Return)
* \t (U+0009 Horizontal Tab)
* \v (U+000B Vertical Tab

##### Unicode Escape Sequences

Unicode escape sequences allow characters from the Basic Multilingual Plane
to embedded in strings.

Unicode escape sequences consist of a `\u` followed by the hex characters that
make up the code point.

Example: 

```jcon
mystring = "A umlaute: \u00FC"
```

will be recognized as: 

```jcon
mystring = "A umlaute: ä"
```
#### Line Continuation

Strings MUST occur on a single line EXCEPT where the final character before 
the new line code point is a backslash (`\`). This allows the string to continue
on the proceeding line.

Example:

```jcon
myLongString = "This is a really long string. \
Yup it really is!"
```

Programs parsing JCON text MUST treat this string as occurring on the same line.

### Numbers

Numbers like Numbers in the ECMAScript specification are always IEEE 754
double precision numbers.

They MAY be written with or without a decimal point:

```jcon
myNumber = 12
myOtherNumber = 12.5
```

### Booleans

Booleans are either the constant `true` or `false`.

### Lists

Lists are a sequence of comma separated values enclosed by square brackets `[]`.
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

### Module Members

JCON supports a syntax for specifying a member from a JavaScript module as a 
value.

The syntax allows for only a single member of a module to be referenced as well
as optionally invoked with arguments.

Details of how to resolve modules are left up to the parsing program.

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
Details of making the variable available are left up to the parsing program.

Context variables may be cast to desired valued by specifying a `|` and the
desired type.

Example:

```jcon
myString = $(number|String)
```

The details of what types are available for casting are left up to the parsing
program.

### Environment Variables

Environment variables are just like context variables, EXCEPT they are meant
to come from the system environment.

Details of what environment variables are available are left to the parsing 
program.

Example:

```jcon
-- This reads an env var.
value = ${VALUE}

value2 = ${VALUE | Number}
```
