// Lexio plugin
(function () {
            
    var _iterator = (function(t, i){
        this.push(t)
    }).iterator();
    
    Object.entity.define("lexio/plugin/??? extends lexio/Plugin", {
        
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




