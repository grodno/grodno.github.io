/**
 *   Text input normalization rules.
 */

text
  = f:token _ r:text { return f + ' ' + r ;}
  / token

token 
  = amount 
  / time
  / r:nonwhite+ { return r.join('');}


amount
  =  n:number m:(_? measure)? 
  { return ''
      +'{{kind:"n"'
        +', value:'+n
        +', measure:"'+(m&&m[1]||"x")+'"'
        +'}}';
  }
  
number
  = sign:"-"? n:int frac:([.,] [0-9]*)
    { return (sign||"")+ n 
        + (frac? '.'+frac[1].join('') :'');
    } 
  / sign:"-"? n:int
    { return (sign||"")+ n} 
  / int
  

  
measure
  = ("$" / ("у." _? "е.") / ("дол" "л"? "."? "аров"?))   
    { return "$" }
  / ("кг" / "kg")
    { return "kg" }
  / "%"
  / ("м" "."? q:" кв."?)   
    { return "m." +(q?'q.':'') }
  / ("г" "."? "од"? "."? "у"?)   
    { return "year" }


time
  =  h:([0-2]? [0-9]) ":" m:([0-5] [-9]) 
  { return ''
      +'{{kind:"time"'
        +', value:"'+(h+":"+m)+'"'
        +'}}';
  }

/*
 * Phone.
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
  = "+"? phone_prefix? [ -]? phone_op_code:(d d)? [ -]? phone_code

phone_prefix
  = "(" d:phone_prefix ")" { return d; }
  / (d d d)

phone_code = dnn:d &{ return dnn>9999;}

/*
 * Primitives.

code
  = int3  
  / (f:d "-" r:int3) {return f+r}


int3
  = f:((d d d) / (d d)) "-" r:int3 {return f.join('')+r}
  / r:((d d d) / (d d)) {return r.join('')}


 */

str = s:[\S]* { return s.join('')}

int
  = r:d+ { return r.join('')}

d "digit"
  = [0-9]

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

nonwhite "non-whitespace"
  = [^ \t\v\f\u00A0\uFEFF\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]