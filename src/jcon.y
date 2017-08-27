
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
Path (([\w@:.-]+)?(\/[\w@:.-]+)+\/?)|(\/)|(\.{1,2}\/?)
Module [a-zA-Z@][a-zA-Z$_0-9-]*

/* Lexer flags */
%options flex
%x VALUE
%x MODULE
%x ENVVAR
%x CALL
%x ARRAY
%x OBJECT
%{ var EOL = require('os').EOL; 
%}
%%

/* Lexer rules */

<INITIAL>'#'.*                                           return;
<INITIAL>{Identifier}                                    return 'IDENTIFIER';
<INITIAL>'='               this.begin('VALUE');          return '=';

<VALUE>{NumberLiteral}     this.popState();              return 'NUMBER_LITERAL';
<VALUE>{StringLiteral}     this.popState();              return 'STRING_LITERAL';
<VALUE>'true'              this.popState();              return 'TRUE';
<VALUE>'false'             this.popState();              return 'FALSE';
<VALUE>{Path}              this.popState(); this.begin('MODULE');  return 'PATH';
<VALUE>{Module}            this.popState(); this.begin('MODULE');  return 'MODULE';
<VALUE>'${'                this.popState(); this.begin('ENVVAR'); return '${';
<VALUE>'$('                this.popState(); this.begin('CALL'); return '$(';
<VALUE>'{'                 this.popState(); this.begin('OBJECT'); return '{';
<VALUE>'['                 this.popState(); this.begin('ARRAY');  return '[';

<MODULE>'|'                                              return '|';
<MODULE>{Identifier}       this.popState();              return 'IDENTIFIER';
<MODULE>','                this.popState();              return ',';
<MODULE>')'                this.popState();this.popState(); return ')';
<MODULE>\s+                this.popState();              return;

<ENVVAR>{Identifier}                                     return 'IDENTIFIER';
<ENVVAR>'}'                this.popState();              return '}'

<CALL>{NumberLiteral}                                    return 'NUMBER_LITERAL';
<CALL>{StringLiteral}                                    return 'STRING_LITERAL';
<CALL>'true'                                             return 'TRUE';
<CALL>','                                                return ',';
<CALL>'false'                                            return 'FALSE';
<CALL>{Path}                this.begin('MODULE');        return 'PATH';
<CALL>{Module}              this.begin('MODULE');        return 'MODULE';
<CALL>'${'                  this.begin('ENVVAR');        return '${';
<CALL>'$('                  this.begin('CALL');          return '$(';
<CALL>'{'                   this.begin('OBJECT');        return '{';
<CALL>'['                   this.begin('ARRAY');         return '[';
<CALL>')'                   this.popState();             return ')';

<ARRAY>'['                 this.begin('ARRAY');          return '[';
<ARRAY>{NumberLiteral}                                   return 'NUMBER_LITERAL';
<ARRAY>{StringLiteral}                                   return 'STRING_LITERAL';
<ARRAY>'true'                                            return 'TRUE';
<ARRAY>'false'                                           return 'FALSE';
<ARRAY>{Path}              this.begin('MODULE');         return 'PATH';
<ARRAY>{Module}            this.begin('MODULE');         return 'MODULE';
<ARRAY>'${'                this.begin('ENVVAR');         return '${';
<ARRAY>'$('                this.begin('CALL');           return '$(';
<ARRAY>'{'                 this.begin('OBJECT');         return '{';
<ARRAY>','                                               return ',';
<ARRAY>']'                 this.popState();              return ']';

<OBJECT>{Identifier}                                     return 'IDENTIFIER';
<OBJECT>'='                this.begin('VALUE');          return '=';
<OBJECT>'['                this.begin('ARRAY');          return '[';
<OBJECT>'}'                this.popState();              return '}';

<*>\s+                                                   return;
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
          : directive* EOF
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
          : (require|call|env_var|list|dict|string_literal|number_literal|boolean_literal)
          ;

require
          : npm_module
            {$$ = new yy.ast.Require($1, null, @$);   }

          | npm_module '|' identifier
            {$$ = new yy.ast.Require($1, $3, @$);}
          ;

env_var
          : '${' identifier '}'
            {$$ = new yy.ast.EnvVar($2, @$);  }
          ;

call
          : '$(' require value_list ')'
            {$$ = new yy.ast.Call($2, $3, @$);    }

          | '$(' require ')'
            {$$ = new yy.ast.Call($2, [], @$);    }
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

npm_module
          : PATH
            {$$ = new yy.ast.Module($1, @$);}

          | MODULE
            {$$ = new yy.ast.Module($1, @$);}
          ;

identifier
          : IDENTIFIER
            {$$ = new yy.ast.Identifier($1, @$);}
          ;
%%
