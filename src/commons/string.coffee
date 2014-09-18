    ###
    Working with Strings.
    ###
    (->
        
        # memoize Templates
        TEMPLATES = {}
        
        # parses and compile binding from expression
        compileTemplate = (s) ->
          return TEMPLATES[s]  if TEMPLATES[s]
          posB = undefined
          posE = -27
          path = undefined
          s0 = s
          s = s.replace(_RE_QUOTE, "\"")
          while ((posB = s.indexOf("{", posE + 27)) > -1) and ((posE = s.indexOf("}", posB)) > -1)
            path = s[posB + 1..posE-1]
            path = path[1..]  if path[0] is " "
            s = s[0..posB-1] + "'+(Object.prop(this,'" + path + "')||'')+'" + s[posE + 1..]
          
          #O.debug(s);
          try
              TEMPLATES[s0] = (new Function("return '" + s + "';"))
          catch
              O.error(_error).log()
              TEMPLATES[s0] = -> 'error in '+s0
    
        
        # memoize regexps
        _RE = (($R) ->
          (key) ->
            $R[key] or ($R[key] = new RegExp("\\{" + key + "\\}", "gm"))
        )({})
        _RE_UNDERSCORE = new RegExp("_", "gm")
        _RE_QUOTE = new RegExp("'", "gm")
        String.LANGUAGE = "en"
        String.LANGUAGES = ["en"]
        
        # @returns localized {#s} or ''
        String.localize = (s) -> String.capitalize(s).replace _RE_UNDERSCORE, " "
    
        
        # @returns capitalized {#s} or ''
        String.capitalize = (s) -> if s?.length then s.toString()[0].toUpperCase() + s[1..] else ""
    
        # @returns camelize {#s} or ''
        String.camelize = (s, sep='_') -> if s?.length then (String.capitalize(t) for t in s.split(sep)).join('') else ''

        # Returns string formatted by template filled with rest of arguments.
        # If template is a function, then it is invoked with rest of arguments passed
        # @return string result.
        String.format = (s) ->
          type = typeof (s)
          if type is "string"
            i = arguments.length - 1
    
            while i > 0
              s = s.replace(_RE(i - 1), arguments_[i])
              i--
            return s
          else return s.apply(null, A::slice.call(arguments, 1))  if type is "function"
          null
    
        
        # @return string formatted by template and key/value map used for placeholder substitution.
        String.formatWithMap = (s, map) ->  compileTemplate(s).call map
    
        return
    )()
