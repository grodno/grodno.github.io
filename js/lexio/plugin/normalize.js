// Lexio plugin
(function () {
    
    Object.entity.define("lexio/plugin/normalize extends lexio/Plugin", {
        requires:['lib://peg-0.7.0']
        ,
        properties:['grammar']
        ,
        grammarUrl:'peg/normalize_parser.pegjs'
        ,
        methods: function(_super){
            
            return {
                
                // init
                init: function(){
                    
                    _super.init.call(this);
                    
                }
                ,
                // implementation of perform on event
                performImpl: function(err, ev){
                    
                    if (this.parser) {
                        ev.normalizedInput = this.parser.parse(ev.input);
                    }
                    
                }
                ,
                notifyHomeReady : function(){
                    
                    if (this.parser){
                        _super.notifyHomeReady.call(this);
                    }
                    
                }
                ,
                grammarChanged : function(ev){
                    
                    if (ev.value) {
                        
                        try {
                            this.parser = PEG.buildParser(ev.value);
                        } catch (ex){
                            console.error('Can\'t create parser', ex);
                        }
                        
                    
                        this.notifyHomeReady();
                        
                    }
                
                }
            };
            
        }
    });
    
})();




