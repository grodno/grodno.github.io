// Plugin for morhological analysis.
(function() {
    
    var _matchesInTree = function(sub,op, ctx) {
        for (var r,x=ctx.x, p=0, c; (c = x[p]) && sub && (sub = sub[c]);p++){
            if ((r=sub['_'])) {
                op.call(ctx, r, x.substring(p+1));
            }
        }
    }
    ,
    _reverseMatchesInTree = function(sub,op, ctx) {
        for (var x=ctx.x, p=x.length-1, c; (c = x[p]) && sub && (sub = sub[c]) ;p--){
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
                score:3*key.length, 
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
                score:2*key.length
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
    
    var register= function(C,key,x) {
        var reg = this.registry[key] || (this.registry[key] = {});
        (reg[x] || (reg[x] =[])).push(C);
    }
    
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
            morphem: function(C,key, x) {
                
                if (this.info[key+x]) return;
        
                this.info[key+x] = C;
        
            //this.text.register(C,key,x);
       
            }
 

            ,
            morphology : function(b) {
                
                if (!b) {
                    b = this.top = new Case(this);
                    
                    b.update({
                        score:1, 
                        x : this.x
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
            
            this.rootify();

            if (this.flexie==null) {
                this.flexie='';
                _reverseMatchesInTree(String.FLEXIES_TREE, op_flexify, this);
            } 
                
            if (this.prefix==null) {
                this.prefix='';
                _matchesInTree(String.PREFIXES_TREE, op_prefixize, this);
            }
                
            if (this.suffix==null) {
                this.suffix='';
                _reverseMatchesInTree(String.SUFFIXES_TREE, op_suffixize, this);
            }
                
            if (this.complexie==null) {
                this.complexie='';
                _matchesInTree(String.COMPLEXIES_TREE, op_complexify, this);
            }
                
        }
        ,
        rootify:function(){

            var c,z,x = this.x, len = x.length, W=this.word;

            W.morphem(this,'root',x);
                
            W.morphem(this,'root',x.replace('ь',''));

            if ((c = (this.suffix || this.flexie)) && ('аеяюий'.indexOf(c[0])>-1)){
                
                W.morphem(this,'root',x+'й');
                
            }
            
            z = x.substr(-1);
            
            if (z==='ж'){
                
                c = x.substring(0,len-1);
                W.morphem(this,'root',c+'д');
                W.morphem(this,'root',c+'з');
                W.morphem(this,'root',c+'г');
                
            }
            
            if ((z==='ч') || (z==='ц')){
                
                c = x.substring(0,len-1);
                W.morphem(this,'root',c+'к');
                W.morphem(this,'root',c+'т');
                
            }

            this.root = x;
        }
        ,
        cuttify:(function(ev){
            APP1=["ся","сь","те"],
            NEG=["не","ни"],
            ETE = ["eте"];

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

    var _iterator = (function(d, i, ev){
        
        if (d.kind==='r') {
            
            var w = d.word = String.getWord(d);
            
            if (!w.top) {
                w.morphology();
            }
            
        }
        
    }).iterator();
    
    Object.entity.define("lexio/plugin/lexer extends lexio/Plugin", {
        
        methods: function(_super){
            
            return {
                
                // implementation of perform on event
                performImpl: function(err, ev){
                    _iterator(ev.tokens, [], ev);
                }
                
            };
            
        }
    });
})();