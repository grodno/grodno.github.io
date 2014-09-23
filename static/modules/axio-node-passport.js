/* 
 * Passport module.
 */

var passport = require('passport');

var _wrap = function(fn){
    return function(ev){
        fn(ev.req, ev.res, this);
    };
};
 
var defaultCallbackEndpointOptions , defaultEndpointOptions;

var strategyDefaultUse = function(cfg) {
    var id = cfg.id, Id = String.capitalize(id);
    var cstr = require('passport-'+(cfg.strategy||id)).Strategy;
    var options = Object.update(Object.get(cfg, 'strategyOptions')||{}, {
        passReqToCallback: true
    });
    options.callbackURL = options.callbackURL|| ("/auth/"+id+"_callback");
    passport.use(new cstr(options, this.verifyCallback(cfg)));
    exports['get'+Id] = _wrap(passport.authenticate(id,  Object.get(cfg, 'endpointOptions') || defaultEndpointOptions ));
    exports['get'+Id+'Callback'] = exports['post'+Id+'Callback'] = _wrap(passport.authenticate(id, Object.get(cfg, 'callbackEndpointOptions') || defaultCallbackEndpointOptions ));
};

var cbVerifyDone = function(req){ 
    return function(err, profile) {
        Object.debug("Passport.cbVerifyDone", err, profile);
        req.res.redirect('/auth/done_popup?profile_id='+(profile ? profile.id : '')+(err?('&error='+JSON.stringify(err)):''));
    }       
}

var STRATEGY_TYPES= {
    'OAuth':{
        use: strategyDefaultUse
        ,
        verifyCallback: function(cfg){ 
            return function(req, accessToken, refreshToken, profile, done) {
            
                profile.access_token = accessToken;
                profile.refresh_token = refreshToken;
                profile.id = '' + profile.id || profile.username; 
                profile.name = profile.displayName; 
                profile.provider = cfg.id;
                
                Object.notify({
                    uri : 'user://verify', 
                    profile:profile 
                }, cbVerifyDone(req));
            }
        }
    }
    ,
    'OpenID':{
        use: strategyDefaultUse
        ,
        verifyCallback: function(cfg){ 
            return  function(req, openId, profile, done) {
                var uri = Object.parseUri(openId);
                profile.id = profile.id || uri.params.id || openId;
                profile.name = profile.displayName; 
                profile.provider = cfg.id;//profile.provider || uri.host;
                Object.notify({
                    uri : 'user://verify', 
                    profile:profile
                }, cbVerifyDone(req));
            }
        }
    }
};

exports.init = function (serv, cfg) {  
    
    serv.app.use(passport.initialize());
    serv.app.use(passport.session());
    
    defaultCallbackEndpointOptions = Object.get(cfg, 'defaultCallbackEndpointOptions');
    defaultEndpointOptions = Object.get(cfg, 'defaultEndpointOptions');
    
    var providers = Object.get(cfg, 'providers');
    
    (function(cfg){
        STRATEGY_TYPES[cfg.type||'OAuth'].use(cfg);
    }).iterator()(providers, serv);
    
    exports.get = function(ev) {
        return {
            providers:(function(cfg){
                this.push({
                    id:cfg.id
                    });
            }).iterator()(providers, [])
            };
    }
    
    exports.getDonePopup = function(ev) {
        return (cfg.callbackHtml || "<script>try {window.localStorage.setItem('auth_location', ''+window.location);window.close();} catch (ex) {}; </script>");
    }
 
}




