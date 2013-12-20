Object.entity.define("lexio/plugin/prepare extends lexio/Plugin",{
    
    
             performImpl:function(err, ev) {
                 
             var tokens = ev.tokens = ev.input.split(' ');
             
             var out = ev.prepared = [];
       
            var patt=/([^А-я]+)([А-я,\-]+)/g;
            var src = ev.src, x, w, c;
            
            while ((x=patt.exec(src))) {
                out.push(x = [x[1], w = x[2],'']);
                
                while (w.length>0 && !isLetter(c = w.charAt(0))) {
                    x[0] += c
                    x[1] = w = w.substr(1);
                }
                
                while (w.length>0 && !isLetter(c = w.substr(-1))) {
                    x[2] = c + x[2];
                    x[1] = w = w.substr(0,w.length-1);
                    console.log(c, w)
                }
                
                if (w && !ev.words[w]){
                    ev.all.push(ev.words[w] = new Word(w, ev));
                }
            }
   }
   
});
