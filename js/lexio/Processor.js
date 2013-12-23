Object.entity.define("lexio/Processor extends EventHandler", {
        
    properties:[':children']
    ,
    ready: false
    ,
    methods: function(_super){
            
        var _ops = (function(d, i){
                
            this.push(function(err,ev){
                return d.perform(err, ev);
            });
            
        }).iterator();

        var _op0 = [function(ev){
                
            ev.flow = this;
                
            return ev;
        }];
    
        return {
            
            init: function(){
                
                this.children = this.plugins;
                
                this.pluginsCount = this.plugins.length;
                
                _super.init.call(this);
                
                
            }
            ,
            handleEventImpl:function(ev) {
                
                var T=this;
                    
                var event = Object.entity.create({
                    id:'lexio/Event'
                    ,
                    input : ev.uri.hash
                },function (err, event){
                    
                    window.setTimeout(function(){
                        
                        Function.perform(_op0.concat(_ops(T.getChildren(),[])).concat(ev.callback), event );
                        
                    
                    }, 0);
                    
                });
                    
                
            }
            ,
            // @set ready flag to true
            setReady:function(c) {
                
                if (c) {
                    this.pluginsCount--;
                }
                
                if (this.pluginsCount === 0 && this.CHARS) {
                    
                    _super.setReady.call(this);
                    
                }
            }
        };
    }
});

