// Plugin for morhological analysis.
(function() {
    
    var _matchesInTree = function(sub,op, ctx) {
        for (var r,x=ctx.x,l=x.length-2, p=0, c; p<l && (c = x[p]) && sub && (sub = sub[c]);p++){
            if ((r=sub['_'])) {
                op.call(ctx, r, x.substring(p+1));
            }
        }
    }
    ,
    _reverseMatchesInTree = function(sub,op, ctx) {
        for (var x=ctx.x, p=x.length-1, c;p>1 && (c = x[p]) && sub && (sub = sub[c]) ;p--){
            if ((sub['_'])) {
                op.call(ctx, x.substring(p), x.substr(0,p));
            }
        }
    }
    ,
    op_prefixize = function(key, rest){
        if (rest.length>1) {
            this.word.morphology(this.branch({
                prefix : key, 
                score: key.length-2, 
                x:rest
            }));
        }
    }
    ,
    op_flexify= function(key, rest){
        if (rest.length>1) {
            this.word.morphology( this.branch({
                flexie:key, 
                score:key.length, 
                x:rest
            } ))
        }
    }
    ,
    op_suffixize =function(key, rest){
        if (rest.length>1) {
            this.word.morphology( this.branch({
                suffix:key, 
                x:rest, 
                score:key.length
            }))
        }
    }
    ,
    op_suffixize2 =function(key, rest){
        if (rest.length>2) {
            this.word.morphology( this.branch({
                suffix:key+this.suffix, 
                suffix2:key,
                x:rest, 
                score:key.length
            }))
        }
    }
    , 
    op_complexify=function(key, rest){
        this.word.morphology( this.branch({
            complexie:key, 
            x:rest, 
            score:2*key.length
        }))
    }; 
    
    var op_morphology = function(c){
        c.morphology();
    };
    
    //## [word] facility:
    String.getWord = (function($R) {

        var Word =  function (d) {
            
            this.token = d;
            this.lang = d.kind;
            this.x = d.id;
            
            this.cases = [];
            this.info = {};
        };
            
        Word.prototype = {
            
            constructor : Word,
            eachCase: function(op, extra) {
                
                Function.iterate(op, this.cases, this, extra);
                
            }
            ,
            morphology : function(b) {
                
                if (!b) {
                    
                    // initial for word
                    b = this.top = new Case(this);
                    
                    b.update({
                        score:1, 
                        x : this.x,
                        suffix : null,
                        suffix2 : null,
                        prefix : null,
                        flexie : null,
                        complexie : null 
                    });
                    
                    if (String.HARDCODED[this.x]) {
                        
                        b.update({
                            hardcoded : true, 
                            score:200
                        });
                        return;
                        
                    }
                    
                    b.cuttify();
                    
                    this.eachCase(op_morphology);
                } else {
                    
                    //with branch
                    b.morphology();
                    
                }
                
                
            }
            ,
            toString : function() {
                var fn = (function(w) {
                    this.push(w.score+": "+ w);
                }).iterator();
                return function(sep) {
                    return  fn(this.cases,[]).join(sep||",  ");
                };
            }()
        }

        return function(d){
            return $R[d.id] || ($R[d.id] = new Word(d));
        };
    
    })(String.WORDS = {});
    
    var Case = function (word, parent, params) {
        
        this.copyFrom(parent);
        
        this.word = word;
        this.level = (parent && parent.level||0) + 1;// branch depth level
        this.word.cases.push(this);
             
        this.update(params);
    }

    Case.prototype.constructor = Case;

    Case.prototype = {
        // current score
        score : 0
        ,
        // copies morphology to {#x}
        copyFrom : function(x) {
            
            if (!x) return;
            
            this.score = x.score;
            this.suffix = x.suffix;
            this.suffix2 = x.suffix2;
            this.prefix = x.prefix;
            this.negation = x.negation;
            this.appendix = x.appendix;
            this.prependix = x.prependix;
            this.flexie = x.flexie;
            this.complexie = x.complexie;
        }
        ,
        branch : function(params) {
            return new Case(this.word, this, params);
        }
        , 
        update : function(params) {
            if (params) {
                var sc = this.score + (params.score||0);
                for(var n in params) {
                    this[n] = params[n];
                }
                this.score = sc;
                
            }
        }
        ,
        toString : function() {
            
            return (this.negation||'')
                + (this.prependix ? this.prependix+'-' : '') 
                + this.getForm()
                + (this.flexie ? ':'+this.flexie : '') 
                + (this.appendix ? ':'+this.appendix : '') ;
        }
        ,
        getForm : function() {
            
            return (this.prefix||'') +(this.complexie ? '{' + this.complexie + '}' : '')
                + '['+ (this.x||'-')+ (!this.root || (this.root === this.x) ? '': ('=' + this.root)) + ']'
                + (this.suffix ||'');
        }
        ,
        morphology : function() {
            var completed = true;
            if (this.flexie===null) {
                this.flexie='';
                completed = 0;
                _reverseMatchesInTree(String.FLEXIES_TREE, op_flexify, this);
            } 
                
            if (this.prefix===null) {
                this.prefix='';
                completed = 0;
                _matchesInTree(String.PREFIXES_TREE, op_prefixize, this);
            }
                
            if (this.suffix===null) {
                this.suffix='';
                completed = 0;
                _reverseMatchesInTree(String.SUFFIXES_TREE, op_suffixize, this);
            } else {
            //    if (this.suffix && (this.suffix2===null) ){
            //    this.suffix2='';
            //    completed = 0;
            //    _reverseMatchesInTree(String.SUFFIXES_TREE, op_suffixize2, this);
            //   }
            }
                
            if (this.complexie===null) {
                this.complexie='';
                completed = 0;
                _matchesInTree(String.COMPLEXIES_TREE, op_complexify, this);
            }    
            
            this.tuneRoot(); 
            
        }
        ,
        tuneRoot:(function(ev){
         var VOWEL_PREP = "aeoi";

            return function() {
                
                var x= this.x;
                if ((x.length>4) && (this.word.lang==='e') &&  (VOWEL_PREP.indexOf(x[0])>-1) && (x[1]===x[2])) {
                    this.branch({
                        prependix:x.substr(0,2), 
                        score:3, 
                        x: x.substr(2)
                    });
                }   
            }
       })()
        ,
        cuttify:(function(ev){
            var APP1=["ся","сь","те"];
            var NEG=["не","ни","un","de","in","re"];
            var NEG3=["dis","non",'mis'];
            var ETE = ["eте"];

            return function() {
                
                var x= this.x;
       
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
                var ch3 = x.substr(0,3);
                if (NEG3.indexOf(ch3)>-1) {
                    this.branch({
                        negation:ch3, 
                        score:4, 
                        x: x.substr(3)
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

        })()
    };

    var _op = function(d){
        
        if (d.kind==='r' || d.kind==='e') {
            
            var w = d.word = String.getWord(d);
            
            if (!w.top) {
                w.morphology();
            }
            
        }
        
    };
    
    Object.entity.define("lexio/plugin/lexer extends lexio/Plugin", {
        
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