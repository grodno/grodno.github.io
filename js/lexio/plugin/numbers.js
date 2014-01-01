// Lexio plugin
(function () {
    var MEASURES={
        "%" : { measure: "%"} 
       ,"руб": { measure: "RUB"}
       ,"рубл": { measure: "RUB"}
       ,"лет": { measure: "age"}
       ,"комнат": { measure: "root"}
       ,"баз_велич": { measure: "BY-Base"}
       ,"час": { measure: "hour"}
       ,"долл": { measure: "USD"}
       ,"у_е": { measure: "USD"}
       ,"уе": { measure: "USD"}
       ,"usd": { measure: "USD"}
       ,"м": { measure: "m"}
       ,"км": { measure: "km"}
       ,"мм": { measure: "mm"}
       ,"кв_м": { measure: "m",measureSpec: "2"}
       ,"куб_м": { measure: "m",measureSpec: "3"}
    }
    var FLEXIES={
        "х" : {flexie:'х'} 
        ,"ий" : {flexie:'й' } 
        ,"й" : {flexie:'й' } 
        ,"ый" : {flexie:'й' } 
        ,"ой" : {flexie:'й' } 
        ,"го" : {flexie:'го' } 
        ,"м" : {flexie:'м' } 
        ,"ом" : {flexie:'м' } 
        ,"ым" : {flexie:'м' } 
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
        while (n && ('er'.indexOf(n.kind)===-1)) {
            n = n.next;
        }
        
        if (!n) return;
        var k = Object.get(n.word,'best.root') || n.id;
        if (MEASURES[k]) {
            
            Object.update(t, MEASURES[k]);
            t.input += " "+t.measure ;
            
            t.setNext(n.next);
            
        } else {
            
            var n2 = n.next;
            while (n2 && ('er'.indexOf(n2.kind)===-1)) {
                n2 = n2.next;
            }
            if (!n2) return;
            
            var k2 = Object.get(n2.word,'best.root') || n2.id;
    
            var m =(MEASURES[k+'_'+k2]||MEASURES[k2+'_'+k]);
            if (m) {
                
                Object.update(t, m);
                t.input += " "+t.measure+ (t.measureSpec ? ("<sup>"+t.measureSpec+"</sup>") : '');

                t.setNext(n2.next);
            }

        }
        
        
        
    }
    ,
    checkFlexie  = function(t){
        var n = t.next;
        if (n && n.kind==='s') {
            n = n.next;
        }
        if (n && n.id==='-') {
            n = n.next;
        }
        if (n && FLEXIES[n.id]) {
            
            Object.update(t, FLEXIES[n.id]);
            t.input += '-'+t.flexie;
            
            t.setNext(n.next);
        }
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
            
            //join separated by dot or comma
            var n2 = Object.get(t.next,'next');
            if (n2 && ('.,'.indexOf(t.next.id)+1) && (n2.kind==='d')) {
                
                t.input  = (t.id += '.'+n2.id);

                t.setNext(n2.next);
            }
        
            t.tags.push('label','numeric');
            
            checkFlexie(t);
            
            checkFactor(t);
            
            checkMeasures(t);
            
            checkPrefix(t);

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

