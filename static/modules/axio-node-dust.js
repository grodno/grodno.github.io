/* 
 * Common View renderer based on Dust.
 */

// `init` module    
exports.init = function (serv, cfg){  
    var dust = require('dust'); 

    var appMeta = serv.config('app', {}); 
    
    var templatePattern = Object.get(cfg,'templatePattern')||'views/{0}.html';
    
    // Disable whitespace compression.
    dust.optimizers.format = function (context, node) {
        return node;
    };      
    
    dust.onLoad =  function(view, callback){
        Object.fs.withFileContent(String.format(templatePattern, view), callback, 'utf8');
    }
    
    Object.entity.create({
        id:'EventHandler:view', 
        handleEventImpl: function(ev){
            var context = ev.context || {};
            var viewId  = ev.viewId || ev.uri.host;
            context.app = appMeta;
            context.viewId = viewId;
                
            dust.render(viewId, context, function(err, result){
                Object.http.send(ev.res, result, Object.http.negotiateMime(viewId));
            });        
        }
    });
}


