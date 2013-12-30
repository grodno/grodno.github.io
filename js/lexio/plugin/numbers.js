// Lexio plugin
(function () {
    var MEASURES={
        "%" : { measure: "%"} 
       ,"долларов": { measure: "USD"}
       ,"долл": { measure: "USD"}
       ,"уе": { measure: "USD"}
       ,"usd": { measure: "USD"}
       ,"м": { measure: "m"}
       ,"км": { measure: "km"}
       ,"мм": { measure: "mm"}
    }
    var FLEXIES={
        "х" : {flexie:'х'} 
        ,"ий" : {flexie:'й' } 
        ,"й" : {flexie:'й' } 
        ,"ый" : {flexie:'й' } 
    }
    var PREFIXES = {
        "br": { measure: "BRB"}
        ,"rub": { measure: "RUR"}
        ,"usd": { measure: "USD"}
    }
    var FACTORS={
        "000" : { factor:1000} 
        ,"тыс" : { factor:1000} 
        ,"тысяч" : { factor:1000} 
        ,"млн" : { factor:1000000} 
        ,"миллионов" : { factor:1000000} 
        ,"млрд" : { factor:1000000000} 
        ,"миллиардов" : { factor:1000000000} 
        ,"трлн" : { factor:1000000000000} 
        ,"триллионов" : { factor:1000000000000} 
    }


    var checkFactor= function(t){
        var n = t.next;
        if (n && n.kind==='s') {
            n = n.next;
        }
        if (n && FACTORS[n.id]) {
            
            Object.update(t, FACTORS[n.id]);
            t.input += ' '+n.input;
            
            t.setNext(n.next);
        }
        if (t.next && t.next.id==='.') {
            
            t.setNext(n.next.next);
        }
    }
    ,
    checkMeasures= function(t){
        var n = t.next;
        if (n && n.kind==='s') {
            n = n.next;
        }
        if (n && MEASURES[n.id]) {
            
            Object.update(t, MEASURES[n.id]);
            t.input += " "+t.measure;
            
            t.setNext(n.next);
        }
        
    }
    ,
    checkFlexie  = function(t){
        var n = t.next;
        if (n && n.id==='-') {
            n = n.next;
        }
        if (n && FLEXIES[n.id]) {
            
            Object.update(t, FLEXIES[n.id]);
            t.input += t.flexie;
            
            t.setNext(n.next);
        }
    }      
    ,
    checkDate  = function(t){
        
    }
    ,
    checkPrefix  = function(t){
            var p = t.prev;
            if (p && ('er'.indexOf(p.kind)+1)) {
                
                if (p && PREFIXES[p.id]) {
            
                    Object.update(t, PREFIXES[p.id]);
                    t.input += " "+t.measure;
            
                    t.setPrev(p.prev);
                    return
                }
                
                if (('er'.indexOf(p.kind)+1)) {
                    
                    p.input  = (p.id += t.id);
                    p.kind = 'a';
                    
                    t.remove();
                    
                    return;
                }
            }
    };      
            
    var _op = function(t){
        if (t.kind==='d'){
            
            var next2 = Object.get(t.next,'next');
            if (next2 && ('.,'.indexOf(t.next.id)+1) && (next2.kind==='d')) {
                
                t.input  = (t.id += '.'+next2.id);
                
                next2.remove();
                t.next.remove();
            }
        
            t.tags.push('label','numeric');
            
            checkFlexie(t);
            
            checkFactor(t);
            
            checkMeasures(t);
            
            checkPrefix(t);
            
            checkDate(t);
            
            
            
        }
        
    };
    
    Object.entity.define("lexio/plugin/numbers extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    ev.eachToken(_op);;
                }
                
            };
            
        }
    });
    
})();

