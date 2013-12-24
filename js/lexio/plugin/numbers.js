// Lexio plugin
(function () {
            
    var _op = function(t){
        if (t.kind==='d'){
            
            var prev = t.prev;
            if (prev) {
                
                if (('er'.indexOf(prev.kind)+1)) {
                    
                    prev.input  = (prev.id += t.id);
                    prev.kind = 'a';
                    
                    t.kind=null;
                    
                    return;
                }
            }
            
            var next2 = Object.get(t.next,'next');
            if (next2 && ('.,'.indexOf(t.next.id)+1) && (next2.kind==='d')) {
                
                t.input  = (t.id += '.'+next2.id);
                
                next2.kind = t.next.kind=null;
            }
        
            t.tags.push('numeric');
        }
        
    };
    
    Object.entity.define("lexio/plugin/numbers extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    ev.eachToken(_op);;
                }
                
            };
            
        }
    });
    
})();

