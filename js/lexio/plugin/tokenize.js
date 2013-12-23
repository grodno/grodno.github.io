// Lexio plugin
(function () {
    
    var META_UNKNOWN ={kind:null};
    
    var _tokenize = (function(v, p, ev) {
        
        var m = ev.CHARS[v] || META_UNKNOWN, id = m.origin || v;
        
        var e = {
            id: id
            , input : v
            , index: 0
            , size : 1
            , chars : [m]
            , kind: m.kind
        };
        
        (ev.chars[id] || (ev.chars[id]=[])).push(e);
        
        e.token = e;
        
        var prev = p>0 && this[this.length-1];
        
        if (prev) {
            
            if (e.kind && prev.kind===e.kind) { // append to previous of same kind
                
                prev.input += e.input;
                prev.id += e.id;
                prev.chars.push(m);
                
                e.token = prev;
                e.index = prev.size++;
                
                e=null;
                
            } else {
                
                e.prev = prev;
                prev.next = e;
            }
        }
        
        e && this.push(e);
        
    }).iterator();   

    Object.entity.define("lexio/plugin/tokenize extends lexio/Plugin",{
    
        performImpl:function(err, ev) {
            
            ev.CHARS = this.home.CHARS;
            
            ev.chars = {};
            
            ev.tokens = _tokenize(ev.input.split(''), [], ev);
            
        }
   
    });

})();
