// Lexio plugin
(function () {
 
    var TYPE_U = {
        lat:''
    }
    var _en = function(ww) {
        for ( var i = 0, r = "", l = ww.length; i < l; i++) {
            r += (String.CHARS[ww[i]] || TYPE_U).lat;
        }
        return r;
    };
    var _translite = function(c) {
        
        if (c.root && String.ROOTS[_en(c.root)])
        {
            c.score+=100;
            c.word.best = c;
        }
        
        
    }
    
    var _iterator = (function(w, i){
        if (!w.trasliterated && w.lang==='r' && w.best.score<59){
            w.trasliterated = 1;
            w.eachCase(_translite);
        }
        
    }).iterator();
    
    Object.entity.define("lexio/plugin/translit extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    _iterator(String.WORDS, ev);
                }
                
            };
            
        }
    });
    
})();






