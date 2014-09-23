/* 
 * SocketServer module. 
 */

exports.init = function (serv, cfg){  
    
    Object.entity.create(Object.update(cfg,{
        id:'SocketServer:web',
        httpServer: serv.httpServer
    }));

}

    