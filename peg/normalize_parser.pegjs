/**
 *   
 */
{
 var FN ={}

 var ALL = [];

 var addCriteria = function(id, body) {
         ALL[ id ] = ' : function(t) {return this["'+id+'"] = '+body+' ? t : null;}'

    }
}

start
  = additive

additive
  = left:multiplicative "|" right:additive { return left + '||' + right; }
  / multiplicative

multiplicative
  = left:primary "*" right:multiplicative { return left +'&&'+ right; }
  / primary

primary
  = integer
  / "(" additive:additive ")" { return additive; }
  / "next(" e:additive ")" { return " with (next) {"+e+"}"; }
  / "numeric(" e:additive ")" { return " with (next) {"+e+"}"; }
  / ""

integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }


grammar
  = tokens:token+ {
      return '{' + 'rules: {' + tokens.join(',')+ '}' + '};';
    }


token
  = id:identifier ":(" expr:expr? ")" kind:kind? size:size? {

        var body = FN[id]  = '('+[expr||'true', kind , size].join(')&&(')+')'

        return ''+ id + ' : function(t) {return this["'+id+'"] = '+body+' ? t : null;}'

        }

  / "@" id:identifier {
            return FN[id];
        }

expr
  = "{" body:([^}]*) "}" {
        return body.join('');
    }
 

kind
 = ":" t:([DERXS]) {

        return 't.kind==="'+t.toLowerCase()+'"'
    }

size
    = "{" size:digit more:"+"? "}" { 
            return 't.size'+(more?'>=':'==')+size 
        }

identifier = f:[a-z] tail:string { return f+tail}

string = s:[a-z0-9$]* { return s.join('')}

digit = [0-9]+

__ = (whitespace / eol / comment)*

/* Modeled after ECMA-262, 5th ed., 7.4. */
comment "comment"
  = singleLineComment
  / multiLineComment

singleLineComment
  = "//" (!eolChar .)*

multiLineComment
  = "/*" (!"*/" .)* "*/"

/* Modeled after ECMA-262, 5th ed., 7.3. */
eol "end of line"
  = "\n"
  / "\r\n"
  / "\r"
  / "\u2028"
  / "\u2029"

eolChar
  = [\n\r\u2028\u2029]

/* Modeled after ECMA-262, 5th ed., 7.2. */
whitespace "whitespace"
  = [ \t\v\f\u00A0\uFEFF\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]