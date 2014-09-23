/* 
 * Chat module.        
 */  
                              
exports.init = function (serv, cfg) {  

    var CHAT = {
        online:0,
        history:[]
    };
    
    Object.entity.create({
        id:'EventHandler:chat', 
        message: function(ev) {
            var msg = ev.message || ev.uri.hash;
            
            Object.debug("Chat message", msg);
            var T = this;
            var m= {
                message: msg, 
                user: ev.user
            };
            Object.notify({
                uri:T.forwardUrl||('db://insert/'+(T.id)), 
                payload:m
            }, function () {
                CHAT.history.push(m);
                Object.notify({
                    uri:'web://broadcastAll',
                    payload:{
                        uri: 'chat://message',
                        message: msg, 
                        user: ev.user
                    }
                });
                ev.callback();
            }
            );
    }
       
    });
}
