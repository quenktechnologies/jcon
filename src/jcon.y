
%lex

/* Definitions */
DecimalDigit [0-9]
DecimalDigits [0-9]+
NonZeroDigit [1-9]
OctalDigit [0-7]
HexDigit [0-9a-fA-F]
ExponentIndicator [eE]
SignedInteger [+-]?[0-9]+
DecimalIntegerLiteral [-]?([0]|({NonZeroDigit}{DecimalDigits}*))
ExponentPart {ExponentIndicator}{SignedInteger}
OctalIntegerLiteral [0]{OctalDigit}+
HexIntegerLiteral [0][xX]{HexDigit}+
DecimalLiteral ([-]?{DecimalIntegerLiteral}\.{DecimalDigits}*{ExponentPart}?)|(\.{DecimalDigits}{ExponentPart}?)|({DecimalIntegerLiteral}{ExponentPart}?)
NumberLiteral {DecimalLiteral}|{HexIntegerLiteral}|{OctalIntegerLiteral}
Identifier [a-zA-Z$_][a-zA-Z$_0-9-]*
LineContinuation \\(\r\n|\r|\n)
OctalEscapeSequence (?:[1-7][0-7]{0,2}|[0-7]{2,3})
HexEscapeSequence [x]{HexDigit}{2}
UnicodeEscapeSequence [u]{HexDigit}{4}
SingleEscapeCharacter [\'\"\\bfnrtv]
NonEscapeCharacter [^\'\"\\bfnrtv0-9xu]
CharacterEscapeSequence {SingleEscapeCharacter}|{NonEscapeCharacter}
EscapeSequence {CharacterEscapeSequence}|{OctalEscapeSequence}|{HexEscapeSequence}|{UnicodeEscapeSequence}
DoubleStringCharacter ([^\"\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
StringLiteral (\"{DoubleStringCharacter}*\")
Org [@][_-a-zA-Z0-9]+
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
            {$$ = [$1];}

          | path '.' identifier
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
            {$$ = [$1];}

          | '..'
            {$$ = [$1];}

          | org
            {$$ = [$1];}

          | identifier 
            {$$ = [$1];}

          | uri '/' '.' 
            {$$ = $1.concat($2, $3);}
          
          | uri '/' '..'
            {$$ = $1.concat($2, $3);}

          | uri '/' org
            {$$ = $1.concat($2, $3);}

          | uri '/' identifier
            {$$ = $1.concat($2, $3);}
          ;

module
          : uri
            {$$ = new yy.ast.Module($1.join(''), @$);}
          ;

org
          : ORG
            { $$ = $1;}
          ;

parameters
          
          : value 
            {$$ = [$1];}
          
          | parameters ',' value
            {$$ = $1.concat($3);}
          ;

var
          : '$(' identifier ')' 
            {$$ = new yy.ast.Var($2, @$);}
          ;

envvar
          : '${' identifier '}'
            {$$ = new yy.ast.EnvVar($2, @$);  }
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

          | '{' pair+ '}'
            {$$ = new yy.ast.Dict($2, @$); }
          ;

pair
          : identifier '=' value
            {$$ = new yy.ast.Pair($1, $3, @$);}
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
