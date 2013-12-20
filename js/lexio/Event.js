// Lexio plugin
(function () {
    
    Object.entity.define("lexio/Event", {
        
        methods: function(_super){
            
            return {
                
                // init
                init: function(){
                    
                    this.value =  ">> " + this.input;
                    
                }
                
            };
            
        }
    });
    
})();

