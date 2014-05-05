// Lexio plugin
(function () {
   
    // normallizzations
    var NORMALIZERS = {r: [
    {
        re:/^(.+)([ие]р)(.*)$/, 
        patches:['р']
    }
    ,{
        re:/^(.+)(оро)(.+)$/, 
        patches:['ра']
    }
    ,{
        re:/^(.+)(оло)(.+)$/, 
        patches:['ла']
    }
    ,{
        re:/^(.+)(ере)(.+)$/, 
        patches:['ре']
    }
    ,{
        re:/^(.+)([цч])$/, 
        patches:['к','т']
        }
    ,{
        re:/^(.+)(ец|ч)$/, 
        patches:['ц']
    }
    
    ,{
        re:/^(.+)(е)г$/, 
        patches:['']
    }
    ,{
        re:/^(.+)(ш)$/, 
        patches:['х','с']
    }
    ,{
        re:/^(.+)(ж)$/, 
        patches:['д', 'з', 'г']
        }
    ,{
        re:/^(.+)(з)$/, 
        patches:['г']
    }
    ,{
        re:/^(.+)(щ)$/, 
        patches:['ст','т']
    }
    ,{
        re:/^(.+)(жд)$/, 
        patches:['д', 'ж']
    }
    ],
    e:[]};

    var tryNormalize = function (n) {
        
        if (this.root) return;
        
        var m = this.x.match(n.re);
        if (m) {
            for (var i = 0; i < n.patches.length; i++) {
                var r  = String.ROOTS[m[1]+n.patches[i]+(m[3]||'')];
                if (r) {
                    
                    this.root = this.x;
                    this.score += this.x.length + (r.score||90);
                    return;
                    
                }
            }
        }
        
    }
    
    var _score = function(c) {
        
        var x = c.x, len = x.length, lang=c.word.lang;
        
        if(len<2){
            return;
        }
        
        var r  = String.ROOTS[x];
        if (r) {
            
            c.root = x;
            
            c.score += len*8+r.score;
            
            return;
        }
        
        var sf =  (c.suffix || c.flexie);
        if (sf && lang==='r' && ('аеяюий'.indexOf(sf[0])>-1) && (r = String.ROOTS[x +'й'])){
                
            c.root = r.id;
            c.score += len+r.score;
            return;        
        }
        if (lang==='e') {
            
            if (sf && (r = String.ROOTS[x +'e'])){
                    
                c.root = r.id;
                c.score += len*8+r.score;
                return;        
            }
            
            if ( (x[len-1]===x[len-2]) && (r = String.ROOTS[x.substring(0, len-1)])){
                    
                c.root = r.id;
                c.score += len*8+r.score;
                return;        
            }            
        }

        if(len<3){
            return;
        }
        
        Function.iterate(tryNormalize,NORMALIZERS[lang],c);
        
        if(c.root){
            return;
        }
        
        var mask;   
        if ((mask=String.ROOT_MASKS[lang+String.signature(x)])) {
            
            c.root = x;
            c.score += this.token.size - len + mask.score;
            return;
        }
    }
            
    var _tres = (function(w, i, tres) {
        if (w.x && w.score>=tres ){//
            this.push(w);
        }
    }).iterator();     
           
    var _iterator = (function(w, i) {
        
        if (w.best) return;
        
        if (w.top.hardcoded) {
            w.best = w.top;
            return;
        }
        
        w.eachCase(_score);
            
        Array.sortBy(w.cases, 'score', -1);        
            
        w.best = w.cases[0];
            
        w.cases = _tres(w.cases,[], w.best.score*0.2);

    }).iterator();     
         
    
    Object.entity.define("lexio/plugin/score extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    
                    _iterator(String.WORDS);
                }
                
            };
            
        }
    });
    
})();


