// Lexio plugin
(function () {
    
    var Token = function(v, m, prev) {
       
        this.id = m.origin || v;
        this.input = v;
        
        this.size = 1;
        
        this.kind = m.kind;
        this.tags = [];
        
        // sequence refs
        if (prev){
            this.prev = prev;
            prev.next = this;
        }
    }
    
    var ZToken = function(t, prev) {
       
        this.id = t.id;
        this.input = t.input || + t.id;
        
        this.size = t.id.length;
        
        this.kind = 'z';
        this.type = t.type;
        this.tags = (t.tags || []).concat('type-'+this.type);
        
        // sequence refs
        if (prev){
            this.prev = prev;
            prev.next = this;
        }
    }
    
    Token.prototype = ZToken.prototype = {
        remove : function(){
            this.kind = null;
            this.prev && (this.prev.next = this.next);
            this.next && (this.next.prev = this.prev);
        },
        setNext : function(n){
            this.next= n;
            if (n){
                n.prev = this;
            }
        }
        ,
        setPrev : function(p){
            this.prev= p;
            if (p){
                p.next = this;
            }
        }
    }
    
    var _tokenize = (function(v, p, ev) {
        
        var prev = ev.lastToken;
        
        if (!v) {
            v= {type:"x", id:"error",input:'[error]' }
        }
        
        if (v.type) {
            
             this.push(ev.lastToken = new ZToken(v, prev));
             
        } else {
            
            // metadata String.CHARS2[ev.lastChar+v] ||
            var m =  String.CHARS[v] || (String.CHARS[v] = {
                kind:'x', 
                lat:'', 
                id:v, 
                type:v, 
                origin:v
            });
            
            //ev.lastChar = v;
            
            if (prev && (prev.kind===m.kind)) { // append to previous of same kind

                var id = m.origin || v;
                prev.input += v;
                
                prev.id += id;
                prev.size++; 
                        
            } else {

                this.push(ev.lastToken = new Token(v, m, prev));

            }
        }
        
        if (!prev) {

            ev.firstToken = ev.lastToken;

        }

        
    }).iterator();   
    
    // parses and compile binding from expression
    var compileTemplate = function(s){

        var  posB, posE = -2,  path, r=[];

        while ( ((posB = s.indexOf('{{')) > -1)&& ((posE = s.indexOf('}}', posB)) > -1) ) {
                
            path = s.substring(posB + 1, posE+1);

            r.push.apply(r, s.substring(0, posB).split(''))
            r.push(Object.parse(path))
            
            s = s.substring(posE + 2);
                
        }
        
        s && r.push.apply(r, s.split(''));

        return r;
    }
        
    Object.entity.define("lexio/plugin/tokenize extends lexio/Plugin",{
    
        performImpl:function(err, ev) {
            
            var arr  = ev.normalizedInput ? compileTemplate(ev.normalizedInput) : ev.input.split('');
            _tokenize(arr, [], ev);
            
        }
   
    });

})();
