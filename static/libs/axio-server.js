    

/* 
 * HTTP utils.
 */

Object.http = (function(){

    var http = require('http');
    var request = require('request');
    var _perform = function(ev){
        Object.debug('Remote HTTP request', ''+ev.uri);
        request.get(''+ev.uri, ev.options, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                console.log(body) // Print the google web page.
            }
            ev.callback(err, body);
        });
    };
    Object.entity.create({
        id:'EventHandler:http', 
        handleEventImpl: _perform
    });
    Object.entity.create({
        id:'EventHandler:https', 
        handleEventImpl: _perform
    });

    http.withFileContent = function(fileName, cb, encoding) {
        var name = path.join(global.__root, fileName);
        path.exists(name, function(x) {
            if (x) {
                fs.readFile(name, encoding, cb);
            } else {
                cb({
                    reason:'not-found', 
                    message:'Not found: '+fileName
                });
            }
        });
    }
    var MIME = http.MIME = {
        URL_ENCODED:"application/x-www-form-urlencoded",
        JSON:'application/json',
        JS:'text/javascript',
        HTML:'text/html',
        CSS:'text/css',
        IMAGE:'image/*',
        JPG:'image/jpg',
        PNG:'image/png',
        GIF:'image/gif',
        TXT:'text/plain',
        APPCACHE:'text/cache-manifest'
    }
    
    /**
     * Return `true` if the request has a body, otherwise return `false`.
     *
     * @param  {IncomingMessage} req
     * @return {Boolean}
     * @api private
     */

    var _hasBody = function(req) {
        return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
    };

    /**
     * Extract the mime type from the given request's
     * _Content-Type_ header.
     *
     * @param  {IncomingMessage} req
     * @return {String}
     * @api private
     */

    var _mime = function(req) {
        var str = req.headers['content-type'] || '';
        return str.split(';')[0];
    };

    var REASON_CODES = http.REASON_CODES = {
        "ok":200
        ,
        "bad":400
        ,
        "conflict":409
        ,
        "forbidden":403
        ,
        "not-found":404
        ,
        "method-not-allowed":405
        ,
        'internal-server-error':500
    }
    ;
    
    http.fetchPayload = function(ev, req, next) {
        if (['get','delete'].indexOf(req.method)===-1){
            req.addListener('data', function(chunk) {
                ev.body += chunk;
            });
            req.addListener('end', function() {
                Object.http.parsePayload(ev, function(){
                    next(err, ev);
                });
            });
        } else {
            this(err, ev);
        }
    }

    http.parsePayload =  function(ev, cb){
        var mime = ev.headers['content-type'];
        var ch0 = ev.body[0];
        if (mime===MIME.URL_ENCODED) {
            ev.payload = Object.parseUri("?"+ev.body).params;
            cb();
        }
        else  if (mime.indexOf('xml')>-1 || ch0=='<' ) 
        {
            var xml2js = require('xml2js');
            var parser = new xml2js.Parser();
            parser.parseString(ev.body,cb);
        
        }
        else  if (ch0=='{' || ch0=='[') 
        {
            try {
                ev.payload = JSON.parse(ev.body);
            } catch(e){
                this.error("bad", "Bad JSON payload format: " +':'+ e);
            }
            cb();
        
        } else {
            cb();
        }
    
   
    }
    
    http.xmlPayloadParser = function(options){
        var options = options || {}
    
        return function (req, res, next) {
            if (req._body) return next();
            req.body = req.body || {};

            if (!_hasBody(req)) return next();

            // check Content-Type
            if (['application/xml','application/atom+xml','application/rss+xml'].indexOf(_mime(req))==-1) return next();

            // flag as parsed
            req._body = true;

            // parse
            var buf = '';
            req.setEncoding('utf8');
            req.on('data', function(chunk){
                buf += chunk;
            });
            req.on('end', function(){
                var first = buf.trim()[0];

                if (0 == buf.length) {
                    return next(400, 'invalid json, empty body');
                }
        
                var xml2js = require('xml2js');
                var parser = new xml2js.Parser();
                parser.parseString(buf,function(err,result) {
                    if (err) {
                        err.body = buf;
                        err.status = 400;
                        next(err);
                    } else {
                        req.body = result;
                        next();
                    }
                });
            //if (strict && '{' != first && '[' != first) return next(400, 'invalid json');
            }
            );
        }
    };

    http.negotiateMime = function(url) {
        var p = url.lastIndexOf('.'), ext =url.substring(p+1).toUpperCase();
        return MIME[ext] || MIME.HTML;
    }

    http.send = function(res, result, mime, reason) {
        var code = reason ? (REASON_CODES[reason] || 500) : 200;
        res.writeHead(code, http.STATUS_CODES[code], {
            'Content-Type': mime || MIME.HTML
        });
        res.end(result);
    }
    
    // send error as JSON
    http.sendJson = function(res, obj, reason) {
        this.send(res, JSON.stringify(obj), MIME.JSON, reason);
    }
    
    // send error as JSON
    http.sendError = function(res, err, message) {
        err = http.narrowError(err, message);
        http.sendJson(res, err, err.reason);
        return err;
    }
    
    http.narrowError = function(err, message) {
        
        err = Object.error(err ||{}, message);
        
        if (!err.reason || !REASON_CODES[err.reason]) {
            err.reason = 'internal-server-error';
        }
    
        if (!err.message) {
            err.message = http.STATUS_CODES[REASON_CODES[err.reason]];
        }
        
        return err;
    }
    
    return http;
    
})();
/* 
 * File system.
 */

Object.fs = (function(){

    var fs = require('fs')
    ,
    path = fs.path = require('path');
    
    fs.withFileContent = function(fileName, cb, encoding) {
        var name = path.join(global.__root, fileName);
        path.exists(name, function(x) {
            if (x) {
                fs.readFile(name, encoding, cb);
            } else {
                cb({
                    reason:'not-found', 
                    message:'Not found: '+fileName
                });
            }
        });
    }
    
    Object.entity.create({
        id:'EventHandler:file', 
        handleEventImpl: function(ev){
            fs.withFileContent(ev.uri.steps.join('/'), function(err, content) {
                if (content) {
                    Object.http.send(ev.res, content, Object.http.negotiateMime(''+ev.uri));
                } else {
                    Object.http.sendError(ev.res, "not-found", 'Url not found: '+ ev.uri);
                }
            }, ev.encoding);
        }
    });
    
return fs;
    
})();/* 
 * The AxioServer class.
 */

// RemoteServerModule 
Object.entity.define('RemoteServerModule extends EventHandler',{
     
    methods : function (_super) {
        var opDone = function(err, result, mime){
            var ev = this.event;
            if (this.viewId) {
                ev.renderView(this.viewId, result);
            } else {
                if (err) {
                    ev.error(err);
                } else {
                    ev.send(result, this.contentType || mime);
                }
            }
            ev.done();
        }
        //
        var opInitArray = [function(ev) { 
            this.event = ev;
            this.options = ev.options;
            this.payload = ev.payload;
            ev.callback  = this;
            this(ev);
        }];
    
        return {
            // init
            init: function() {
                _super.init.call(this);
                Object.log('++Module: ', this.id);
                //delete require.cache[p];
                var m = this.impl = require(this.requirePath, true);
                m.init && m.init(this.server, this.config);
            }
            ,
            // done
            done: function() {
                Object.log('--Module: ', this.id);
                this.impl.done && this.impl.done(this);
            }
            ,
            handleEvent: function(ev) {
                ev = ev.payload;
                var uri = ev.uri;
                var opId = String.capitalize(String.camelize(uri.path[1]));
                var op = this.impl[ev.options.method+opId];
                var opName = this.id+'.'+ev.options.method+opId;
                if (op) {
                    try {
                        Object.log('!!! Operation', opName);
                        Function.perform(opInitArray.concat(op, opDone), ev); // do perform
                    } catch(ex){
                        ev.error(ex, "Error in "+ opName);
                    }              
                } else {
                    if ((ev.options.method==='options') && this['post'+opId]) {
                        ev.send('OK');
                    } else {
                        ev.error("no-op", 'Operation not found: '+ opName);
                    }
                }
            }
        }
    }
});

// Object.web.Server prototype 
Object.entity.define('RemoteServer extends EventHandler',{
     
    methods : function (_super) {
        
        var initModuleIterator = (function(cfg, i, T) {
            cfg = Object.narrowFromString(cfg);
            var p = T.config('rootdir','.') + '/' +(cfg.path || String.format(T.config('modulesPattern')||'{0}.js', cfg.id));
            this[cfg.id] = Object.entity.create({
                id:'RemoteServerModule:remote_'+cfg.id, 
                config : cfg, 
                server : T,
                requirePath : p
            });
        }).iterator();
        
        return {
            // init
            init: function() {

                // underlying http server
                this.httpServer = require('http').createServer(this.app); 
                
                _super.init.call(this);
       
                // init modules
                this.modules = initModuleIterator(this.config('modules'), {}, this);

            } 
            ,
            // done server instance.
            // invoked from process.on('SIGTERM') hook
            done : function (cb){
                //require.cache = {};
                Object.unlisten._all();
                for (var n in this.modules) {
                    this.modules[n].done();
                }
                this.httpServer.removeAllListeners('connection');
                this.httpServer.removeAllListeners('request');
                this.httpServer.close(cb);
                return this;
            }
            ,
            // gets config param
            config: function(key, def) {
                return Object.get(this.cfg, key) || def || null;
            }
            ,
            // listen http port
            listenHttpPort : function (port, cb){   
                port = port || this.config('http.port', 80);
                this.httpServer.listen(port, function() {
                    Object.log('Server is listening at port: ', port);
                    cb && cb();
                });
            }
            ,
            // express handler that 
            //   - dispatch requests to handle with appropriate module method 
            //   - and then send the result back with response
            createHandler:function () {
        
                return function (req, res, next) {
                    
                    var isMethodAllowed = ['get','post','put','delete','options'].indexOf(req.method.toLowerCase())>-1;
                
                    if (!isMethodAllowed) {
                        next();
                    } else {
                        var ev = Object.entity.create({
                            id:'RemoteServerEvent', 
                            req : req, 
                            res : res
                        });
                        
                        var foundModule = Object.notify({
                            uri:'remote_'+(ev.uri.path[0] || 'home')+'://handle',
                            payload: ev
                        });
                        
                        if (!foundModule) {
                            next();
                        }
                    }      
                }
            }
        }
    }
});

// RemoteServer Event 
Object.entity.define('RemoteServerEvent extends EventHandler',{
     
    methods : function (_super) {
        return {
            // init
            init: function(config) {
                _super.init.call(this);
                
                var req = this.req;

                this.payload = req.body || '';
                
                var opts = this.options = {};
    
                for (var n in req.headers) {
                    opts[n.toLowerCase()] = req.headers[n];
                }
                var host = opts['x-forwarded-host'] || opts.host || 'default';
    
                this.uri = Object.parseUri('//'+host+req.url);
    
                this.access_token =  opts['x-authorization'] || opts['authorization'] || null;
    
                Object.update(opts, this.uri.params);
    
                opts.method = req.method.toLowerCase();
    
                opts.language = opts.language || opts.lang || String.LANGUAGE;
            }
            ,
            // done
            done: function() {
                this.payload = this.req = this.res = null;
            }
            ,
            // send error as JSON
            error : function(err, message) {
                Object.error.log(Object.http.sendError(this.res, err, message));
            }
            ,
            // send static file content
            sendStatic : function (filename) {   
                Object.notify({
                    uri : 'file://'+filename, 
                    res:this.res
                });
            }
            ,
            // send object as JSON
            sendJson : function(obj, reason) {
                Object.http.sendJson(this.res, obj, reason);
            }
            ,
            // send string result
            send : function(result, mime, reason) {
                Object.http.send(this.res, (typeof(result)==='string') ? result : JSON.stringify(result), mime, reason);
            }
            ,
            // renders a view
            renderView : function (viewId, context){  
                Object.notify({
                    uri : 'view://'+viewId, 
                    context: context, 
                    res: this.res
                });
            }
        }
    }
});(function () {

    // @define [SocketServer] entity based on Socket.IO.
    Object.entity.define('SocketServer extends EventHandler', {
        methods: function(_super) {
            return {
                init : function() {
                    var T = this;
                    
                    _super.init.apply(this, arguments);
                    
                    var io = require('socket.io').listen(this.httpServer);
                    
                    // configure
                    io.configure(function () {
                        io.set('transports', T.transports || ['xhr-polling']);//'flashsocket', 'websocket',  
                        io.set("polling duration", T.pollingDuration || 15); 
                        io.enable(T.enable||'log');
                    });
                    
                    var sockets = io.sockets;//.of('/'+(T.channel||''));
    
                    T.broadcastAll = function(ev) {
                        sockets.json.send(ev.payload);
                    };

                    sockets.on('connection', function(socket) {
                        
                        Object.debug('connection');
                        
                        socket.on('connect', function () {
                            T.onConnect({
                                //   socket : socket
                                });
                        });

                        socket.on('message', function(ev, callback) {
                            Object.debug('message', ev, callback);
                            //ev = Object.parse(ev)
                            //ev.uri = Object.parseUri(ev.uri);
                            //ev.socket = socket;
                            ev.callback = callback || Function.NONE;
                            if (ev.user) {
                                socket.set('user', ev.user, function () {
                                    Object.notify(ev);
                                }) 
                            } else {
                                socket.get('user', function (err, user){
                                    ev.user = user;
                                    Object.notify(ev);
                                });
                            }
                        });

                        socket.on('disconnect', function () {
                            T.onDisconnect({
                                //   socket : socket
                                });
                        });
                    }); 
                }
                , 
                onConnect: function(ev) {
                    Object.debug('onConnect');
                }
                , 
                onDisconnect: function(ev) {
                    Object.debug('onDisconnect');
                }
                , 
                user: function(ev) {
                    Object.debug('user');
                    ev.callback();
                }
                , 
                handleEventImpl: function(ev) {
                    var op = ev.uri.host;
                    Object.debug("Socket.", op);
                    ev.uri = ev.uri.hash || ev.uri;
                    this[op](ev);
                }
            }
        }
    });
  
})();
