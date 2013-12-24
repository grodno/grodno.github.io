// Lexio plugin
(function () {
            
    var _op = function(t){
        
        if (('er'.indexOf(t.kind)+1) && t.size>1 && t.input===t.input.toUpperCase()) {
            t.kind ='a';
        }
        
    };
    
    Object.entity.define("lexio/plugin/abbr extends lexio/Plugin", {
        
        methods: function(_super){
            
            return { 
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    ev.eachToken(_op);
                }
                
            };
            
        }
    });
    
})();




