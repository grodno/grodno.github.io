// Lexio plugin
Object.entity.define("lexio/plugin/syntesize extends lexio/Plugin",{
   handleEventImpl:function(ev){
      Word.plugins.syntesize = (function() {

        var caseFilterFn = function(v){
             return v.root;
        };
                var syntesize = function(ev) {
            var arr = Object.ownProps(ev.registry.root), c;
            var roots = Word.prototype.roots;
            for (var i=0,l=arr.length; i<l;i++) {
                if (roots[(c = arr[i]).id]){
                    c = c.value;
                    for (var j=0,ll=c.length; j<ll;j++) {
                        c[j].score+=100;
                    }
                
                } else if (c.id.length>2 && LANG.ROOT_MASKS[_signature(c.id)]) {
                    c = c.value;
                    for (var j=0,ll=c.length; j<ll;j++) {
                        c[j].score+=50;
                    }                
                }

            }
      
            ev.forEachWord('syntesize');
        };
        return function(W) {
            // handle result
            var b = W.branches;
            if (b.length>1) {
                //b = b.filter(caseFilterFn); 
                W.best = Array.item(W.branches = Array.sortBy(b, 'score', -1)) || W.top;
            }
        }
})();

Text.prototype.syntesize = (function() {
  
        var _FN=(function(v){
            var x = v[1],w;
            if (x && (w=this.words[x])){
                this.totalCount++;
                var best = w.bestCase;
                if (best) {
                    var tres  = best.score *0.8;
                    for(var ww,i=0, cases=w.cases, l=cases.length; i<l;i++ ) {
                        //(w = w.bestCase)
                        ww=cases[i];
                        if (ww.score>tres && ww.isEnough() && (ww.root.substr(-1)!=='т')){
                            this.goodCount++;
                            pushIntoCategory(this.tags,ww.root||'',ww);
                        }
              
                    //if(w.heuristic)
                    //if (w.suffix) {
                    //    pushIntoCategory(this.sx_tags,(w.suffix||''),w);
                    //}
                    // pushIntoCategory(this.px_tags,w.prefix||'-',w);
                    }                        
                }
          
            }
        }).iterator()
  

  
        return function() {
            var ev=this;  
            ev.totalCount = 0;
            ev.goodCount = 0;
      
            _FN(ev.prepared,ev);
            return 'Total ' +ev.totalCount
            +',Hit ' +ev.goodCount
            +',Pro ' +Math.round(1000*ev.goodCount/(ev.totalCount+1))/10 +'%<br/> var result = {<br/>'
            +'<br/>}'
        ;
        }
    
    })();
    }
});

