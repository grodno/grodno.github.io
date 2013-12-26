// Lexio plugin ancestor
Object.entity.define("lexio/Plugin",{
    
    methods: function(_super){
            
        return {
            init: function(){
                
                this.home = this.parentEntity;
                
                _super.init.call(this);

                this.notifyHomeReady();

            }
            ,
            notifyHomeReady : function(){
                
                this.home.setReady(1);
                
            }
            ,            
            // perform on event
            perform: function(err, ev){
                    
                this.performImpl(err,ev);
                    
                return ev;
                    
            }
            ,
            // perform on event
            performImpl : function(err, ev) {
                return ev;
            }
        };
    }

});

