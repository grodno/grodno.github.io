// Lexio plugin
// show as HTML
(function () {
        
    var showWordsIterator = (function(w){
        this.push(w.toHTML())
    }).iterator();
  
    Object.entity.define("lexio/plugin/??? extends lexio/Plugin", {
        
        // perform on event
        handleEventImpl:(function() {
            
            var _fn = (function(v, i, words) {
                var w = words[v[1]];
                this.r += (v[0] +(w?w.toHTML():v[1]) +(v[2]||''));
            }).iterator();
      
            return function() {
                return _fn(this.prepared,{
                    r:''
                },this.words).r;
            };
      
        })()
        
    });
    
})();




