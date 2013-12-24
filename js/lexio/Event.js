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
                ,
                eachToken: function(op, extra){
                    for(var t=this.firstToken, r; t; t = t.next){
                        if((r = op.call(this, t, extra))){
                            return r;
                        };
                    }
                    return null;
                }
            };
            
        }
    });
    
})();

