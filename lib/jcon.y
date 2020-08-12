
%lex

/* Definitions */
DecimalDigits [0-9]+
NonZeroDigit [1-9]
DecimalIntegerLiteral [-]?([0]|({NonZeroDigit}{DecimalDigits}*))

NumberLiteral ([-]?{DecimalIntegerLiteral}\.{DecimalDigits}*)|(\.{DecimalDigits})|({DecimalIntegerLiteral})

Identifier [a-zA-Z$_][a-zA-Z$_0-9]*
UriPath [a-zA-Z$_][a-zA-Z$_0-9-]*
LineContinuation \\(\r\n|\r|\n)
HexDigit [0-9a-fA-F]
UnicodeEscapeSequence [u]{HexDigit}{4}
SingleEscapeCharacter [\'\"\\bfnrtv]
CharacterEscapeSequence {SingleEscapeCharacter}
EscapeSequence {CharacterEscapeSequence}|{UnicodeEscapeSequence}
DoubleStringCharacter ([^\"\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
StringLiteral (\"{DoubleStringCharacter}*\")
Org [@][-_a-zA-Z0-9]+
Characters [^\n]*

/* Lexer flags */
%options flex
%%

/* Lexer rules */
\s+                                                      return;
'include'                                                return 'INCLUDE';
'true'                                                   return 'TRUE';
'false'                                                  return 'FALSE';
{Org}                                                    return 'ORG';
{Identifier}                                             return 'IDENTIFIER';
{UriPath}                                                return 'URIPATH';
{StringLiteral}                                          return 'STRING_LITERAL';
{NumberLiteral}                                          return 'NUMBER_LITERAL';
<*>'--'{Characters}                                      return 'COMMENT';
<*>'${'                                                  return '${'
<*>'$('                                                  return '$('
<*>'='                                                   return '=';
<*>'$'                                                   return '$';
<*>'['                                                   return '[';
<*>']'                                                   return ']';
<*>'{'                                                   return '{';
<*>'#'                                                   return '#';
<*>'}'                                                   return '}';
<*>','                                                   return ',';
<*>'('                                                   return '(';
<*>')'                                                   return ')';
<*>'..'                                                  return '..';
<*>'.'                                                   return '.';
<*>'/'                                                   return '/';
<*>'|'                                                   return '|';
<*><<EOF>>                                               return 'EOF';

/lex

%ebnf
%start file
%%

file
          
          : includes EOF
            {$$ = new yy.ast.File($1, [], @$); return $$;}

          | includes directives EOF
            {$$ = new yy.ast.File($1, $2, @$); return $$;}

          | directives EOF
            {$$ = new yy.ast.File([],$1, @$); return $$;}

          | EOF
            {$$ = new yy.ast.File([], [], @$); return $$;}
          ;

includes
          : include
            {$$ = [$1];}
  
          | includes include
            {$$ = $1.concat($2);}
          ;

include
          : INCLUDE string_literal
            {$$ = new yy.ast.Include($2, @$); }
          ;

directives
          : comment
            {$$ = [$1];}

          | property
            {$$ = [$1];}

          | directives comment 
            {$$ = $1.concat($2);}

          | directives property
            {$$ = $1.concat($2);}
          ;

comment
          : COMMENT 
            {$$ = new yy.ast.Comment($1.slice(2), @$);}
          ;

property 

          : path '=' value
            {$$ = new yy.ast.Property($1, $3, @$); }
          ;

path
          : identifier
            {$$ = [$1];           }

          | string_literal
            {$$ = [$1];           }

          | path '.' identifier
            {$$ = $1.concat($3);  }

          | path '.' string_literal
            {$$ = $1.concat($3); }
          ;

value
          : (
             member
             |var
             |envvar
             |list
             |dict
             |string_literal
             |number_literal
             |boolean_literal)
          ;

member
          
          : module '#' identifier
            {$$ = new yy.ast.Member($1, $3, false, [], @$);}

          | module '#' identifier '(' ')'
            {$$ = new yy.ast.Member($1, $3, true, [], @$);}

          | module '#' identifier '(' parameters ')'
            {$$ = new yy.ast.Member($1, $3, true, $5, @$);}
          ;

uri
          : '.'
            {$$ = $1;}

          | '..'
            {$$ = $1;}

          | ORG
            {$$ = $1;}

          | IDENTIFIER
            {$$ = $1;}

          | URIPATH
            {$$ = $1;}

          | uri '/' '.' 
            {$$ = $1+$2+$3;}
          
          | uri '/' '..'
            {$$ = $1+$2+$3;}

          | uri '/' ORG
            {$$ = $1+$2+$3;}

          | uri '/' IDENTIFIER
            {$$ = $1+$2+$3;}

          | uri '/' URIPATH
            {$$ = $1+$2+$3;}
          ;

module
          : uri
            {$$ = new yy.ast.Module($1, @$);}
          ;

parameters
          
          : value 
            {$$ = [$1];}
          
          | parameters ',' value
            {$$ = $1.concat($3);}
          ;

var
          : '$(' identifier filters? ')' 
            {$$ = new yy.ast.Var($2, $3||[], @$);}
          ;

envvar
          : '${' identifier filters? '}'
            {$$ = new yy.ast.EnvVar($2, $3||[], @$);  }
          ;

filters
          : '|' filter
            {$$ = [$2]; }

          | filters '|' filter
            {$$ = $1.concat($3); }
          ;

filter
          : identifier
            {$$ = new yy.ast.Filter($1, @$); }
          ;

list      
          : '[' ']'
            {$$ = new yy.ast.List([], @$); }

          | '[' value_list ']'
            {$$ = new yy.ast.List($2, @$); }
          ;

value_list
          : value                 {$$ = [$1];         }
          | value_list ',' value  {$$ = $1.concat($3);}
          ;

dict
          : '{' '}'
            {$$ = new yy.ast.Dict([], @$); }

          | '{' property+ '}'
            {$$ = new yy.ast.Dict($2, @$); }
          ;

string_literal
          : STRING_LITERAL 
            {$$ = new yy.ast.StringLiteral($1.slice(1, -1), @$); }
          ;

boolean_literal
          : TRUE
            {$$ = new yy.ast.BooleanLiteral(true, @$);}

          | FALSE
            {$$ = new yy.ast.BooleanLiteral(false, @$);}
          ;

number_literal
          : NUMBER_LITERAL
            {$$ = new yy.ast.NumberLiteral(parseFloat($1), @$); }
          ;

identifier
          : IDENTIFIER
            {$$ = new yy.ast.Identifier($1, @$);}
          ;
%%
