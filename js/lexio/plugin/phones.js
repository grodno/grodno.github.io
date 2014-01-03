// Lexio plugin
(function () {

    var _op = function(t){
        if (t.kind==='d'){
            
            var next2 = Object.get(t.next,'next');
            while (0 && next2 && ('- ()'.indexOf(t.next.id)+1) && (next2.kind==='d')) {
                
                t.input  = t.id  = (t.id += ''+next2.id);
                
                
                t.setNext(next2.next);
                
                next2 = Object.get(t.next,'next');
            }
            
            var p = t.prev;
            if (p && p.id==='+') {
                t.input = t.id  =  "+" + t.input;
                t.setPrev(p.prev);
            }
            
            if (t.id.length===11 && t.id.substring(0,2)==='80'){
                t.input = t.id  =  "+375" + t.id.substring(2);
            }
            
            if (t.id[0]==='+'){
                t.input = "+(" + t.id.substring(1,4)+')'+(t.id.substring(4,6))+'-'+t.id.substring(6);
            }
            
                
            
        }
        
    };
    
    Object.entity.define("lexio/plugin/phones extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    ev.eachToken(_op);
                }
                
            };
            
        }
    });
    
})();

