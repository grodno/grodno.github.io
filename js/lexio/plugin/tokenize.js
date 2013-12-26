// Lexio plugin
(function () {
    
    var Token = function(v, m, prev) {
       
        this.id = m.origin || v;
        this.input = v;
        
        this.chars = [m];
        this.size = 1;
        
        this.kind = m.kind;
        this.tags = [];
        
        // sequence refs
        if (prev){
            this.prev = prev;
             prev.next = this;
        }
    }
    
    Token.prototype = {
        remove : function(){
            this.kind = null;
            this.prev && (this.prev.next = this.next);
            this.next && (this.next.prev = this.prev);
        }
    }
    
    var _tokenize = (function(v, p, ev) {

        // metadata
        var m = String.CHARS[v] || (String.CHARS[v] = {kind:'x', lat:'', id:v, type:v, origin:v});

        if (!ev.lastToken) {
            
            this.push(ev.firstToken = ev.lastToken = new Token(v, m, null));
            
        } else {
            
            var prev = ev.lastToken;
           
            if (prev.kind===m.kind) { // append to previous of same kind
                
                prev.input += v;
                prev.id += m.origin || v;
                prev.chars.push(m);
                prev.size++;

            } else {
                
                this.push(ev.lastToken = new Token(v, m, prev));
                
            }
        }

        
    }).iterator();   

    Object.entity.define("lexio/plugin/tokenize extends lexio/Plugin",{
    
        performImpl:function(err, ev) {
            
            _tokenize(ev.input.split(''), [], ev);
            
        }
   
    });

})();
