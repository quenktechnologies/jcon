
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
Module [.a-zA-Z@$][.a-zA-Z@$-_/]*
Characters [^\n]*

/* Lexer flags */
%options flex
%x COMMENT
%x VALUE
%x VAR
%x ENVVAR
%x DICT
%x LIST
%x MODULE
%x MEMBER
%x INVOKE
%x PARAMS
%%

/* Lexer rules */
<INITIAL>\s+                                             return;
<INITIAL>'include'                                       return 'INCLUDE';
<INITIAL>{Identifier}                                    return 'IDENTIFIER';
<INITIAL>{StringLiteral}                                 return 'STRING_LITERAL';
<INITIAL>'--'             this.begin('COMMENT');         return 'COMMENT';
<COMMENT>{Characters}     this.popState();               return 'CHARACTERS';
<INITIAL>'='              this.begin('VALUE');           return '=';
<VALUE>\s+                                               return;
<VALUE>'true'             this.popState();               return 'TRUE';
<VALUE>'false'            this.popState();               return 'FALSE';
<VALUE>{NumberLiteral}    this.popState();               return 'NUMBER_LITERAL';
<VALUE>{StringLiteral}    this.popState();               return 'STRING_LITERAL';
<VALUE>{Module}           this.popState(); this.begin('MODULE'); return 'MODULE';
<MODULE>'#'               this.popState(); this.begin('MEMBER'); return '#';
<MEMBER>{Identifier}      this.popState(); this.begin('INVOKE'); return 'IDENTIFIER';
<INVOKE>\s+               this.popState();               return;
<INVOKE>','               this.popState();               return ',';
<INVOKE>']'               this.popState();               return ']';
<INVOKE>'('               this.popState(); this.begin('PARAMS'); return '(';
<PARAMS>\s+                                              return;
<PARAMS>'true'                                           return 'TRUE';
<PARAMS>'false'                                          return 'FALSE';
<PARAMS>{NumberLiteral}                                  return 'NUMBER_LITERAL';
<PARAMS>{StringLiteral}                                  return 'STRING_LITERAL';
<PARAMS>{Module}          this.begin('MODULE');          return 'MODULE';
<PARAMS>'${'              this.begin('ENVVAR');          return '${';
<PARAMS>'{'               this.begin('DICT');            return '{';
<PARAMS>'['               this.begin('LIST');            return '[';
<PARAMS>')'               this.popState();               return ')';
<VALUE>'${'               this.popState(); this.begin('ENVVAR'); return '${';
<ENVVAR>{Identifier}                                     return 'IDENTIFIER';
<ENVVAR>'}'               this.popState();               return '}';
<VALUE>'$'                this.popState(); this.begin('VAR'); return '$';
<VAR>{Identifier}         this.popState();               return 'IDENTIFIER';
<VALUE>'{'                this.popState(); this.begin('DICT');   return '{';
<DICT>\s+                                                return; 
<DICT>{Identifier}                                       return 'IDENTIFIER';
<DICT>'='                 this.begin('VALUE'); return '=';
<DICT>'}'                 this.popState();               return '}';
<VALUE>'['                this.popState(); this.begin('LIST'); return '[';
<LIST>\s+                                                return;
<LIST>'true'                                             return 'TRUE';
<LIST>'false'                                            return 'FALSE';
<LIST>{NumberLiteral}                                    return 'NUMBER_LITERAL';
<LIST>{StringLiteral}                                    return 'STRING_LITERAL';
<LIST>{Module}            this.begin('MODULE');          return 'MODULE';
<LIST>'${'                this.begin('ENVVAR');          return '${';
<LIST>'{'                 this.begin('DICT');            return '{';
<LIST>'['                 this.begin('LIST');            return '[';
<LIST>']'                 this.popState();               return ']';
<*>'|'                                                   return '|';
<*>','                                                   return ',';
<*>'('                                                   return '(';
<*>')'                                                   return ')';
<*>'%'                                                   return '%';
<*>';'                                                   return ';';
<*>':'                                                   return ':';
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
          : COMMENT CHARACTERS
            {$$ = new yy.ast.Comment($2, @$);}
          ;

property 

          : path '=' value
            {$$ = new yy.ast.Property($1, $3, @$); }
          ;

path
          : identifier
            {$$ = [$1];}

          | module
            {$$ = [$1];}

          | path '.' identifier
            {$$ = $1.concat($3); }
          ;

value
          : (
             member
             |call
             |var
             |env_var
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

module
          : MODULE
            {$$ = new yy.ast.Module($1, @$);}
          ;

parameters
          
          : value 
            {$$ = [$1];}
          
          | parameters ',' value
            {$$ = $1.concat($3);}
          ;

var
          : '$' identifier 
            {$$ = new yy.ast.Var($2, @$);}
          ;

env_var
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
