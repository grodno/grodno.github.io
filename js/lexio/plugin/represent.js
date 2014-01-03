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
            title = c.root? (c.root +' \n,'+w) : w.top.x;
            
            cl.push(c.hardcoded? 'hardcoded' : (sc > 49 ? (sc >99 ? 'good' : 'norm'): (sc>10 ? 'weak' : 'bad')));
        }
        
        return t.kind==='s'?' ':String.format('<span title="{0}" class="{1}">{2}</span>'
            , title
            , cl.concat(t.tags).join(' ')
            , t.input);
    }
            
    var _op = function(d){
        this.value += _toHtml(d);
    };
    
    Object.entity.define("lexio/plugin/represent extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    
                    ev.value = '';
                    
                    ev.eachToken(_op);
                    
                    console.log('lexio: ', ev);
                }
            };
        }
    });
    
})();





