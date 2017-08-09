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
Module [@a-zA-Z$_][a-zA-Z$_0-9-/]*
DotIdentifier [a-zA-Z$_][a-zA-Z$_0-9.-]*
LineContinuation \\(\r\n|\r|\n)
OctalEscapeSequence (?:[1-7][0-7]{0,2}|[0-7]{2,3})
HexEscapeSequence [x]{HexDigit}{2}
UnicodeEscapeSequence [u]{HexDigit}{4}
SingleEscapeCharacter [\'\"\\bfnrtv]
NonEscapeCharacter [^\'\"\\bfnrtv0-9xu]
CharacterEscapeSequence {SingleEscapeCharacter}|{NonEscapeCharacter}
EscapeSequence {CharacterEscapeSequence}|{OctalEscapeSequence}|{HexEscapeSequence}|{UnicodeEscapeSequence}
DoubleStringCharacter ([^\"\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
SingleStringCharacter ([^\'\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
TemplateStringCharacter ([^\`\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
StringLiteral (\"{DoubleStringCharacter}*\")|(\'{SingleStringCharacter}*\')|(\`{TemplateStringCharacter}*\`)
Text ({DoubleStringCharacter}*)|({SingleStringCharacter}*)

/* Lexer flags */
%options flex
%%

/* Lexer rules */

\s+                                                      return;
'#'.*                                                    return;
'true'                                                   return 'TRUE';
'false'                                                  return 'FALSE';
'import'                                                 return 'IMPORT';
'as'                                                     return 'AS';
'from'                                                   return 'FROM';
'('                                                      return '(';
')'                                                      return ')';
'['                                                      return '[';
']'                                                      return ']';
'%'                                                      return '%';
'|'                                                      return '|';
';'                                                      return ';';
':'                                                      return ':';
'='                                                      return '=';
','                                                      return ',';
'.'                                                      return '.';
'{'                                                      return '{';
'}'                                                      return '}';
'/'                                                      return '/';
{NumberLiteral}                                          return 'NUMBER_LITERAL';
{StringLiteral}                                          return 'STRING_LITERAL';
{Identifier}                                             return 'IDENTIFIER';
{Module}                                                 return 'MODULE';

<*><<EOF>>                                               return 'EOF';

/lex

%ebnf
%start file
%%

file
          : directive+ EOF
            {$$ = new yy.ast.File($1, @$); return $$;}
          ;

directive 
          : identifier '=' value
            {$$ = new yy.ast.Directive($1, $3, @$); }

          | path '=' value
            {$$ = new yy.ast.Directive($1, $3, @$); }
          ;

path
          : identifier '.' identifier
            {$$ = new yy.ast.Path($1, $3, @$); }

          | path '.' identifier
            {$$ = new yy.ast.Path($1, $3, @$); }
          ;

value
          : (module|env_var|list|dict|string_literal|number_literal|boolean_literal)
          ;

module
          : MODULE 
            {$$ = new yy.ast.Module('default', $1, @$);   }

          | IDENTIFIER FROM MODULE
            {$$ = new yy.ast.Module($1, $3, @$);      }
          ;

env_var
          : '$' '{' IDENTIFIER '}'
            {$$ = new yy.ast.EnvVar($3, @$);  }
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

          | '{' kvp+ '}'
            {$$ = new yy.ast.Dict($2, @$); }
          ;

kvps
          : kvp         {$$ = [$1];         }
          | kvps kvp    {$$ = $1.concat($2);}
          ;

kvp
          : identifier '=' value
            {$$ = new yy.ast.KVP($1, $3, @$);}
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
