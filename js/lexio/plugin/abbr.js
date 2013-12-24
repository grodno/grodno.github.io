// Lexio plugin
(function () {
            
    var _iterator = (function(t, i){
        
        if (('er'.indexOf(t.kind)+1) && t.size>1 && t.input===t.input.toUpperCase()) {
            t.kind ='a';
        }
        
    }).iterator();
    
    Object.entity.define("lexio/plugin/abbr extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    _iterator(ev.tokens, ev);
                }
                
            };
            
        }
    });
    
})();




