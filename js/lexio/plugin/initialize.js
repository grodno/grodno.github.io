// Lexio plugin
(function (global) {
    
    Object.log =  function() {
    var c = global.console, args = Array.slice(arguments,0);
    if (c && c.log) {
        if (c.log.apply) {
            c.log.apply(c,args);
        } else {
            c.log(args.join(': '));
        }
    }
};

    Object.ownProps  = function(obj) {
        var result = [];
        for(var n in obj) {
            if (obj.hasOwnProperty(n)) {
                result.push({
                    id:n,
                    value:obj[n]
                });
            }
        }
        return result;
    };

    Array.prototype.sortByMirrorKey = function(key) {
        key = key||'id';
        return this.sort( function(s1,s2,v1,v2){
            v1=s1[key].mirror();
            v2=s2[key].mirror();
            return v1>v2?1:(v1<v2?-1:0);
        }
        )
    };

    Array.prototype.sortByKeyLen = function(key) {
        key = key||'id';
        return this.sort( function(s1,s2,v1,v2){
            v2=s1[key].length;
            v1=s2[key].length;
            return v1>v2?1:(v1<v2?-1:0);
        }
        )
    };

    Array.prototype.getKeys = function(key) {
        key = key||'id';
        return(function(v, p){
            this.push(v[key]);
        }).iterator()(this, []);
    }

    //returns mirrored of {#this) .
    String.prototype.mirror = function() {
        var r = '';
        for (var i=this.length-1; i>=0;i--) {
            r+=this[i];
        }
        return r;
    };
    
    // checks if {#this} ends with given {#suffix}.
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
    
    var _undef;
  
    var isLetter = function(f) {
        return CHARS[f]!==_undef;
    }
    
    var pushIntoCategory = function(obj,cat,val) {
        if (!obj[cat]) {
            obj[cat] = {
                all:[]
            }
        };
        obj[cat].all.push(val);
    }
   
    var tagsSorterFn = function(s1,s2,v1,v2){
        v1=s1.value.all.length;
        v2=s2.value.all.length;
        return v1>v2?-1:(v1<v2?1:0);
    };
     
    Object.entity.define("lexio/plugin/initialize extends lexio/Plugin", {
        methods: function(_super){
            
            
            return {
                
                // perform on event
                performImpl : function(err, ev) {
                    
                   // NOOP
                        
                }
                
            };
            
        }

        
    });
    
})(this);




