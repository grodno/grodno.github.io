// Lexio plugin
(function () {


  
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
    
    Object.entity.define("lexio/plugin/meta extends lexio/Plugin", {
        methods: function(_super){
            
            var registry = function(arr, key) {
        key = key||'id';
        return(function(v, p){
            this[v[key]] = v;
        }).iterator()(arr, {});
    }
            
            var applySourceData = function(data) {
  
                Object.update(this, {
                    ROOTS : registry(data.roots)
                    ,
                    COMPLEXIES : registry(data.complexies)
                    ,
                    HARDCODED : registry(data.hardcoded)
                    ,
                    COMPLEXIES_TREE : data.complexies.getKeys().makeMatchingTree()
                    ,
                    PREFIXES_TREE : data.prefixes.getKeys().makeMatchingTree()
                    ,
                    SUFFIXES_TREE : data.suffixes.getKeys().mirrorItems().makeMatchingTree()
                    ,
                    FLEXIES_TREE : data.flexies.getKeys().mirrorItems().makeMatchingTree()
                    ,
                    //vowels/consonats masks enabled for roots.Used for filter tokens as possible roots.
                    ROOT_MASKS : registry(data.masks)
                    ,
                    CHARS : registry(data.chars)
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
                            T.parentEntity.setReady();
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




