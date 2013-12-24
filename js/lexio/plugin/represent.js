// Lexio plugin
// show as HTML
(function () {
    
    var _toHtml = function(t) {
        
        var w = t.word;
        
        if (!w) return t.input
        
        var c = w.best || w.top;
        
        var sc = c.score, cl = c.hardcoded? 'hardcoded' : (sc > 49 ? (sc >99 ? 'good' : 'norm'): (sc>19 ? 'weak' : 'bad'));
        
        return String.format('<span title="{0} \n,{1}" class="{2}">{3}</span>', c.root||c.x, w, cl, t.input);
    }
            
    var _iterator = (function(d, i){
        this.value += _toHtml(d);
    }).iterator();
    
    Object.entity.define("lexio/plugin/represent extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    
                    ev.value = '';
                    
                    _iterator(ev.tokens, ev);
                    
                    console.log('lexio: ', ev);
                }
            };
        }
    });
    
})();





