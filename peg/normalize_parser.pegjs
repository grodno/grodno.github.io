/**
 *   Text input normalization rules.
 */

text
  = f:token _ r:text { return f + ' ' + r ;}
  / token

token 
  = code
  / amount 
  / r:[a-zA-Z]+ { return r.join('')}


amount
  =  n:number m:(_? measure)? 
  { return ''
      +'{{kind:"n"'
        +', value:'+n
        +', measure:"'+(m&&m[1]||"x")
        +'"}}';
  }
  
number
  = sign:"-"? n:int frac:([.,] [0-9]*)
    { return (sign||"")+ n 
        + (frac? '.'+frac[1].join('') :'');
    } 
  / sign:"-"? n:int
    { return (sign||"")+ n} 
  / int
  
code
  = int3  
  / (f:d " " r:int3) {return f+r}


int3
  = f:((d d d) / (d d)) " " r:int3 {return f.join('')+r}
  / r:((d d d) / (d d)) {return r.join('')}


int
  = r:d+ { return r.join('')}


d
  = [0-9]

  
measure
  = ("$" / ("у." _? "е.") / ("дол" "л"? "."? "аров"?))   
    { return "$" }
  / ("кг" / "kg")
    { return "kg" }
  / "%"
  / ("м" "."? q:" кв."?)   
    { return "m." +(q?'q.':'') }

_ = " "+

/**
 * Samples
 */
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


token22
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

/*
 * Number.
 */



number
  = sign:"-"? n:num_value m:num_measure? { return '{{type:"number", value: '+((sign||"")+n)+', measure:"'+(m||"plain")+'"}}';}
  
num_value
  = n:num frac:([.,]  [0-9]*)? { return n + (frac? '.'+frac[1].join('') :'');} 
  / num
  
num 
  = n:[0-9]+ rest:([0-9] "" num)?  { return n.join('') + (rest? rest[1] :'');}
  / r:[0-9]+ { return r.join('')}
  
num_measure
 = ("$" / ("у." _? "е.") / ("дол" "л"? "."? "аров"?))   { return "$" }
 / ("кг" / "kg")


_ = " "+

/*
 * Phone number.
 */
phone
  = (phone_intro _)? (phone_op _)? n:phone_number  (phone_op _)? { return '{{type:"phone", value:"'+n+'"}}';}
  
phone_intro
  = [тТ] "ел" "."? "ефон"? [:.]?
  
phone_op
  = "(" phone_op ")"
  / [vV] "el" "."? "com"? "e"?
  / ("MTS" / "МТС" / "мтс") "."?
  / [Ll] "ife"

phone_number
  = "+"? phone_prefix? [ -]? phone_op_code:d2? [ -]? phone_code

phone_prefix
  = "(" d:phone_prefix ")" { return d; }
  / d3

phone_code = dnn:d &{ return dnn>9999;}

/*
 * Primitives.
 */

d "digit"  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

d2 "digital2"  = digits:([0-9] [0-9]) { return parseInt(digits.join(""), 10); }

d3 "digital3"  = digits:([0-9][0-9][0-9]) { return parseInt(digits.join(""), 10); }

str = s:[\S]* { return s.join('')}

/*
 * Whitespace.
 */
 
_ = (whitespace)*

 
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