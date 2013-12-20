// register async listener for API calls
(function() {
       //## [word] facility:
    String.word = (function() {

        var Word =  function (src, text) {
            
            this.branches = [];
            this.lang = 'en';
            this.info = {};
            this.text = text;
            this.src = src;
            
            this.x = this.x.toLowerCase().replace('ё','е').replace('ъ','ь');

            (this.best = this.top = new Case(this)).update({
                score:1, 
                x : src
            });
        };

        Word.prototype = {
            
            constructor : Word,
            
            morphem: function(C,key,x) {
                if (this.info[key+x]) return;
        
                this.info[key+x] = C;
        
                this.text.register(C,key,x);
       
            }
            ,
            toString : function() {
                var fn = (function(w) {
                    this.push(w.score+": "+ w);
                }).iterator();
                return function(sep) {
                    return  fn(this.branches,[]).join(sep||",  ");
                };
            }()
            ,
            toHTML : function() {
                var w = this.best;
                if (w.hardcoded) return this.src;
                var sc = w.score, cl =(sc > 49 ? (sc >99 ? 'good' : 'norm'): (sc>19 ? 'weak' : 'bad'));
                return '<span title="'+(w.root||"")+' \n,'+ this.toString()+ '" class="' + cl + '">'+ this.src+ '</span>';
            }     
        }

        return Word;
    
    })();
    
        var Case = function (word, parent, params) {
            this.copyFrom(parent);
            this.word = word;
            this.level = (parent && parent.level||0) + 1;// branch depth level
            this.word.branches.push(this);
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
                    if (this.word.best.score<this.score){
                        this.word.best = this;
                    }
                }
            }
            ,
            toString : function() {
                return (this.negation||'')+(this.prependix ? this.prependix+'-' : '') + this.getForm()+ (this.flexie ? ':'+this.flexie : '') +(this.appendix ? ':'+this.appendix : '') ;
            }
            ,
            getForm : function() {
                return (this.prefix||'') +(this.complexie ? '{' + this.complexie + '}' : '')
                + '['+ (this.x||'-')+ (!this.root || (this.root === this.x) ? '': ('=' + this.root)) + ']'
                + (this.suffix ||'')
            }

        };
    
    
    Object.entity.define("PluginMorphology extends EventHandler",{
        id:':ga',
        handleEventImpl:function(ev){
            /* 
             * Plugin for morhological analysis.
             */
 this.src = ev.text || '';
                this.words={};
                this.all=[];
                this.registry={};
                
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
                    this.word.runOne('morphology', this.branch({
                        prefix : key, 
                        score: key.length-2, 
                        x:rest
                    }));
                }
            }
            ,
            op_flexify= function(key, rest){
                if (rest.length>1) {
                    this.word.runOne('morphology', this.branch({
                        flexie:key, 
                        score:3*key.length, 
                        x:rest
                    } ))
                }
            }
            ,
            op_suffixize =function(key, rest){
                if (rest.length>1) {
                    this.word.runOne('morphology', this.branch({
                        suffix:key, 
                        x:rest, 
                        score:2*key.length
                    }))
                }
            }
            , 
            op_complexify=function(key, rest){
                this.word.runOne('morphology', this.branch({
                    complexie:key, 
                    x:rest, 
                    score:2*key.length
                }))
            };

            Word.plugins.morphology = function(W) {

                W.runOne('rootify',this);

                if (this.flexie==null) {
                    this.flexie='';
                    _reverseMatchesInTree(W.FLEXIES_TREE,op_flexify, this);
                } 
                if (this.prefix==null) {
                    this.prefix='';
                    _matchesInTree(W.PREFIXES_TREE,op_prefixize, this);
                }
                if (this.suffix==null) {
                    this.suffix='';
                    _reverseMatchesInTree(W.SUFFIXES_TREE,op_suffixize, this);
                }
                if (this.complexie==null) {
                    this.complexie='';
                    _matchesInTree(W.COMPLEXIES_TREE,op_complexify, this);
                }
                return false;
            };

      


        }
    });

})();