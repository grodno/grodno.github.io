// Lexio plugin
(function () {

    var checkYear = function(t){
        var n = t.next;
        if (n && n.kind==='s') {
            n = n.next;
        }
        
        if (n && n.word && n.word.best.root=='год') {
            
            t.input += " г.";
            
            t.setNext(n.next);
            
            t.tags.push('year');
            
            var p = t.prev;
            if (p && p.kind==='s') {
                p = p.prev;
            }
            if(!p) return;
        
            if ((p.tags.indexOf('date')+1)) {
            
                p.input += "-"+t.input;
                p.year = t.id;
                p.setNext(t.next);
            
            }
            if ((MONTH_ROOTS.indexOf(Object.get(p,'word.best.root')))) {
                p.input += "-"+t.input;
                p.year = t.id;
                p.setNext(t.next);
                p.tags.push('label','date','month');
            }
        
        }



    }
    ,
    MONTH_ROOTS = ['янв','февр','март','апрел','май','июн','июл','август','сентябр','октябр','ноябр','декабр']
    ,
    checkDate  = function(t){
        
        var n = t.next;
        if (n && n.kind==='s') {
            n = n.next;
        }
        if (n && n.word && (MONTH_ROOTS.indexOf(Object.get(n,'word.best.root'))+1)) {
            
            t.input += "-"+n.input;
            t.setNext(n.next);
            t.year = CURR.getFullYear();
            t.tags.push('label','date');
        }
       
    }
     
            
    var _op = function(t){
        if (t.kind==='d'){
            
            
            if (checkYear(t)) {
		// 123
		w=2                
            }
            
            checkDate(t);
            
        }
        
    };
    var CURR = new Date();
    
    Object.entity.define("lexio/plugin/dates extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    ev.eachToken(_op);
                }
                
            };
            
        }
    });
    
})();

