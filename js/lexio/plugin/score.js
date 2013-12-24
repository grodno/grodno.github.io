// Lexio plugin
(function () {
   
    var TYPE_U = {
        type:'x'
    }
    var _signature = function(ww) {
        for ( var i = 0, r = "", l = ww.length; i < l; i++) {
            r += (String.CHARS[ww[i]] || TYPE_U).type;
        }
        return r;
    };

    
    var _score = function(c) {
        var sc = c.score, x = c.x;
        
        var len = x.length;
        
        if(len<2){
            return;
        }
        
        if (String.ROOTS[x]) {
            
            sc += len+100;
            
        } else {
            
            if (len>2 && String.ROOT_MASKS[_signature(x)]) {
                
                sc += this.token.size - len + 50;
                
            } else  {
                sc /= 2;
                //this.success( x, (this.top.src.length - len)-50);
                //this.complexify(x);
            } 
        }
 
        c.score = sc;      
        
        if (this.best.score < sc){
            this.best = c;
        }
        
    }
            
    var _tres = (function(w, i, tres) {
        if (w.score>tres){
            this.push(w);
        }
    }).iterator();     
           
    var _iterator = (function(w, i) {
        
            if (w.best) return;
        
            w.best = w.top;
            
            w.eachCase(_score);
            
            w.cases = _tres(w.cases,[], w.best.score*0.2);
            
            Array.sortBy(w.cases, 'score', -1);        
            
    }).iterator();     
         
    
    Object.entity.define("lexio/plugin/score extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    
                    _iterator(String.WORDS);
                }
                
            };
            
        }
    });
    
})();


