// Lexio plugin
(function () {
   
    // normallizzations
    var NORMALIZERS = [
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
    // ,{        re:/^(.+)([цч])$/, patches:['к','т']}
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
    // ,{        re:/^(.+)(ж)$/, patches:['д', 'з', 'г']}
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
    ]   ;

    function tryNormalize(n) {
        
        if (this.root) return;
        
        var m = n.re.match(this.x);
        if (m) {
            for (var i = 0; i < n.patches.length; i++) {
                var r  = String.ROOTS[m[0]+n.patches[i]+m[2]];
                if (r) {
                    
                    this.root = this.x;
                    this.score += this.x.length + (r.score||90);
                    return;
                    
                }
            }
        }
        
    }
    
    var _score = function(c) {
        
        var x = c.x, c, z;
        
        var len = x.length;
        
        if(len<2){
            return;
        }
        
        var r  = String.ROOTS[x];
        if (r) {
            
            c.root = x;
            
            c.score += len+(r.score||100);
            
            return;
        }

        if ((c = (this.suffix || this.flexie)) && ('аеяюий'.indexOf(c[0])>-1) && (r = String.ROOTS[x +'й'])){
                
            c.root = x+'й';
            c.score += len+(r.score||100);
            return;        
        }

        if(len<3){
            return;
        }
        
        Function.iterate(tryNormalize,NORMALIZERS,c);
        
        if(c.root){
            return;
        }
        
            
        if (len>2 && String.ROOT_MASKS[String.signature(x)]) {
                
                c.score += this.token.size - len + 50;
                
            // } else  {
                
            
            // z = x.substr(-1);
            
            // if (z==='ж'){
                
            //     c = x.substring(0,len-1);
            //     W.morphem(this,'root',c+'д');
            //     W.morphem(this,'root',c+'з');
            //     W.morphem(this,'root',c+'г');
                
            // }
            
            // if ((z==='ч') || (z==='ц')){
                
            //     c = x.substring(0,len-1);
            //     W.morphem(this,'root',c+'к');
            //     W.morphem(this,'root',c+'т');
                
            // }
                
                
            //     sc /= 2;
                //this.success( x, (this.top.src.length - len)-50);
                //this.complexify(x);
            
        }
 
        if (this.best.score < c.score){
            this.best = c;
        }
        
    }
            
    var _tres = (function(w, i, tres) {
        if (w.score>tres){
            this.push(w);
        }
    }).iterator();     
           
    var _iterator = (function(w, i) {
        
            if (w.best) return;
        
            w.best = w.top;
            
            w.eachCase(_score);
            
            w.cases = _tres(w.cases,[], w.best.score*0.2);
            
            Array.sortBy(w.cases, 'score', -1);        
            
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


