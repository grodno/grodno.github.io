/* 
 * Video streaming module. 
 */

exports.init = function (serv, cfg){  
     var vidStreamer = require("vid-streamer");
     serv.app.get("/video/*", vidStreamer.settings(cfg));
}


    