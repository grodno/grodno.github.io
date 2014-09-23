/* 
 * Home module. 
 */

exports.init = function (serv){  

 
    exports.get = function(ev) {
        this.viewId='index';
        return {}; 
    }

    exports['getThe.appcache'] = function(ev) {
        this.viewId='the.appcache';
        return {}; 
    }

    exports['getOffline'] = function(ev) {
        this.viewId='offline'; 
        return {}; 
    }
    
}