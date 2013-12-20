// register async listener for API calls
// clears both prepending and appending hyphens
(function() { 
    Object.entity.define("PluginPrependixAndAppendix extends EventHandler",{

        handleEventImpl:function(ev){

    
            var APP0=['то','либо','нибудь'];
            APP1=["ся","сь","те"],
            NEG=["не","ни"],
            ETE = ["eте"];

            return function(W) {
                var x= this.x;
        
                // split by '-'
                if ((x.length > 4) && (x.indexOf('-') > -1 )) {
                    var a2 = x.split('-');
                    var r = Array.item(a2, -1);
                    if (APP0.indexOf(r)>-1) {
                        this.appendix = r;
                        a2 = a2.splice(0,a2.length-1);
                        r = Array.item(a2, -1);
                    }
                    if(a2.length>1){
                        this.prependix = a2.splice(0,a2.length-1).join('-');
                    }
                    this.src = r;
                }
       
                var ch2 = x.substr(-2);
                if (APP1.indexOf(ch2)>-1) {
                    this.branch({
                        appendix:ch2, 
                        score:3, 
                        x: x.substr(0,x.length-2)
                        });
                }
                ch2 = x.substr(0,2);
                if (NEG.indexOf(ch2)>-1) {
                    this.branch({
                        negation:ch2, 
                        score:3, 
                        x: x.substr(2)
                        });
                }
                ch2 = x.substr(-3);
                if (ETE.indexOf(ch2)>-1) {
                    this.branch({
                        appendix:'е', 
                        score:3, 
                        x: x.substr(0,x.length-1)
                        });
                }
            };

        }
    });

})();  

