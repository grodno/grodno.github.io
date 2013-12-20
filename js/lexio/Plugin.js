Object.entity.define("lexio/Plugin",{
    
    methods: function(_super){
            
        var _handler = (function(d, i, ev){
                
            d.handleEvent(ev);
                
        }).iterator();
            
        return {
            init: function(){
                
                console.log(''+this, 'init');
                    
                _super.init.call(this);
                    
            }
            ,            
            // perform on event
            perform: function(err, ev){
                    
                console.log(''+this, 'perform');
                    
                this.performImpl(err,ev);
                    
                return ev;
                    
            }
            ,
            // perform on event
            performImpl : function(err, ev) {
                return ev;
            }
            ,
            getPlugin : function(id) {
                return Word.plugins[this.lang+'_'+id] || Word.plugins[id]
            }
            ,
            runOne : function(id,b) {
                var p = this.getPlugin(id);
                p.call(b || this.top, this);
            }
            ,
            eachBranch : function(id) {
                var p = this.getPlugin(id), b=this.branches;
                for ( var i = 0, l= b.length; i < l; i++) {
                    p.call(b[i], this);
                }
            }
            ,
            register: function(C,key,x) {
                var reg = this.registry[key] || (this.registry[key] = {});
                (reg[x] || (reg[x] =[])).push(C);
            }
            ,
            forEachWord : function(op) {
                for (var i=0, l=this.all.length; i<l; i++) {
                    this.all[i][op]();
                }
            }
        };
    }

});

