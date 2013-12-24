// Lexio Event
(function () {
    
    Object.entity.define("lexio/Event", {
        
        methods: function(_super){
            
            return {
                
                // init
                init: function(){
                    
                    // default result
                    this.value = this.input;
                    
                }
                
            };
            
        }
    });
    
})();

