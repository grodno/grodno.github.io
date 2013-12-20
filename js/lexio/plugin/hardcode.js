// register async listener for API calls
// checks if {#x} is hardcoded
Object.entity.define("PluginHardcoded extends EventHandler", {
    handleEventImpl:function(ev){
Word.plugins.hardcoded = function(W) {
    if (W.hardcoded[this.x]) {
        this.update({hardcoded : true, score:200});
    } else {
        W.runOne('morphology', this);
    }
};    }
});

