// Lexio plugin
(function () {

    var _reg = (function(v, p){
        this[v.id] = v;
    }).iterator();
            
    var registry = (function(v){
        var key = v.toUpperCase();
        _reg(this[v], String[key] || (String[key]={}));
                
    }).iterator();
    
     var enums = (function(v){
        var key = v.key.toUpperCase();
        var b = String[key] || (String[key]={});
        b[v.id] = v.value;
        
    }).iterator();
  
    Array.prototype.mirrorItems = function() {
        return (function(v){
            this.push(v.mirror(''));
        }).iterator()(this, [])
    };

    Array.prototype.makeMatchingTree = function() {
        return (function(v){
            Object.set(this, (v+'_').split('').join('.'),v);
        }).iterator()(this, {})
    };
    
    var TYPE_U = {
        type:'x'
    }

    String.signature = function(x) {
        for ( var i = 0, r = "", l = x.length; i < l; i++) {
            r += (String.CHARS[x[i]] || TYPE_U).type;
        }
        return r;
    };

    
    Object.entity.define("lexio/plugin/meta extends lexio/Plugin", {
        
        methods: function(_super){
            
            var applySourceData = function(data) {
                
                registry(['chars','roots','complexies','hardcoded','chars'], data);
                
                enums(data['~']);
                
                Object.update(String, {
                    
                    COMPLEXIES_TREE : data.complexies.getKeys().makeMatchingTree()
                    ,
                    PREFIXES_TREE : data.prefixes.getKeys().makeMatchingTree()
                    ,
                    SUFFIXES_TREE : data.suffixes.getKeys().mirrorItems().makeMatchingTree()
                    ,
                    FLEXIES_TREE : data.flexies.getKeys().mirrorItems().makeMatchingTree()
 
                });
            };
            
            
            return {
                init: function(){
                
                    _super.init.call(this);
                    
                    var T = this;
                    
                    Function.perform([
                        
                        function(sources){
                            
                            for ( var i = 0, l=sources.length; i < l; i++) {
                                Object.notify(sources[i], this.cb());
                            }
                            
                            return true;
                        }
                        ,
                        function(err){
                            Function.iterate(applySourceData, Array.slice(arguments,2), T.home)
                            T.home.setReady();
                        }
                        ], this.sources);
                    
                }
                ,                
                // implementation of perform on event
                perform: function(err, ev) {
                    return ev;
                }
            };
            
        }
    });
    
})();




