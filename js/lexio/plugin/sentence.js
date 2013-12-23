// Lexio plugin
(function () {
    
    var _registrator = (function(v, p){
        this[v] || (this[v] = {
            id: v
        });
    }).iterator();   

    Object.entity.define("lexio/plugin/sentence extends lexio/Plugin",{
    
    
        performImpl:function(err, ev) {
                 
            var tokens = ev.input.split('.');
        
            ev.sentences = [];
        
            
            for (var v=ev.input,p=0; (p=(v.indexOf('.')+1)); v = v.substring(p+1)) {
                
                if (!isAbbr()){
                    ev.sentences.push({input:v.substring(0,p)});
                } else {
                    v.substring(0,p)
                }
            }
        }
   
    });

})();
