(function() {
    var _rootify = function(x) {
        var rx = this.roots, ch;
        var len = x.length;
        if(len<2){
            return null;
        }
        if (rx[x]) return {root:x, score: len+100};
 
        if (len>2 && this.ROOT_MASKS[x.getSignature()]) {
            this.success({root:x, score: this.word.top.src.length-len+50});
        } else  {
            //this.success( x, (this.top.src.length - len)-50);
            //this.complexify(x);
        }
        return null;
    }

    ,
    // normallizzations
    NORMALIZERS = [
        {        re:/^(.+)([ие]р)(.*)$/, patches:['р']}
        ,{        re:/^(.+)(оро)(.+)$/, patches:['ра']}
        ,{        re:/^(.+)(оло)(.+)$/, patches:['ла']}
        ,{        re:/^(.+)(ере)(.+)$/, patches:['ре']}
        // ,{        re:/^(.+)([цч])$/, patches:['к','т']}
        ,{        re:/^(.+)(ец|ч)$/, patches:['ц']}
    
        ,{        re:/^(.+)(е)г$/, patches:['']}
        ,{        re:/^(.+)(ш)$/, patches:['х','с']}
        // ,{        re:/^(.+)(ж)$/, patches:['д', 'з', 'г']}
        ,{        re:/^(.+)(з)$/, patches:['г']}
        ,{        re:/^(.+)(щ)$/, patches:['ст','т']}
        ,{        re:/^(.+)(жд)$/, patches:['д', 'ж']}
    ]  

    Object.entity.define("lexio/plugin/rootify extends lexio/Plugin", {
        
        handleEventImpl:function(ev){

            var c,z,x = this.x, len = x.length;
       
            W.morphem(this,'root',x);
            W.morphem(this,'root',x.replace('ь',''));
       
            if ((c= (this.suffix || this.flexie)) && ('аеяюий'.indexOf(c[0])>-1)){
                W.morphem(this,'root',x+'й')
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

    })();


})();