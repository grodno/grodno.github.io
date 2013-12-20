// register async listener for API calls
Object.entity.define("PluginHardcoded extends EventHandler",{
    id:':ga',
    handleEventImpl:function(ev){
// checks if {#x} is hardcoded
Word.plugins.hardcoded = function(W) {
    if (W.hardcoded[this.x]) {
        this.update({hardcoded : true, score:200});
    } else {
        W.runOne('morphology', this);
    }
};    }
});

