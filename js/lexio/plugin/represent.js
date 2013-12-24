// Lexio plugin
// show as HTML
(function () {
    
    var _toHtml = function(t) {
        
        if (!t.kind) return '';
        
        var w = t.word;
        var cl=['kind-'+t.kind], title = '';
        
        if (w){
            var c = w.best || w.top;
        
            var sc = c.score;
            title = (c.root||c.x) +' \n,'+w;
            
            cl.push(c.hardcoded? 'hardcoded' : (sc > 49 ? (sc >99 ? 'good' : 'norm'): (sc>19 ? 'weak' : 'bad')));
        }
        
        return t.kind==='s'?' ':String.format('<span title="{0}" class="{1}">{2}</span>'
            , title
            , cl.concat(t.tags).join(' ')
            , t.input);
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





