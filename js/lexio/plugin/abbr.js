// register async listener for API calls
Object.entity.define("lexio/plugin/abbr extends lexio/Plugin",{
    id:':ga',
    handleEventImpl:function(ev){
        if (this.x===this.x.toUpperCase()) {
            W.info.abbreviation = true;
            W.text.register(this,'abbreviations',this)
        } else {
        }
    }
    
});

