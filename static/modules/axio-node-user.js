/* 
 * User module.
 */
var meCbStart = [function (err, user) {
    this((err || !user) ? (err || Object.error('not-found', 'User not found')) : null, this.user = user);
}];

var withUser = exports.getMe = function(ev, cb){
    Object.notify({
        uri : 'db://findOne/user'
        , 
        query: ev.query || {
            access_token: ev.access_token
        }
    }, meCbStart.concat(cb || ev.callback));
}

exports.init = function (serv, cfg) {  
    
  
    Object.entity.create({
        id:'EventHandler:user'
        ,
        me : withUser
        ,
        logout : function(ev) {
            withUser(ev, [function (err, user){
                    Object.log('User logout', user);
                    this(err)
                }].concat(ev.callback));
        }
        ,
        login : function(ev) {
            Function.perform ([
                function(ev) { 
                    // get profile
                    Object.notify({
                        uri : 'db://findOne/profiles', 
                        query: {
                            provider: ev.provider, 
                            id:ev.profileId
                        }
                    },this.cb());
                    // get currentUser   
                    if (ev.access_token) {
                        Object.notify({
                            uri:'db://findOne/users', 
                            query:Object.slice(ev,['access_token'])
                        },this.cb());
                    }
                    // get all user with same profile
                    Object.notify({
                        uri : 'db://query/users', 
                        query: Object.narrowFromString(''+ev.profileId,'providers.'+ev.provider+'.id')
                    },this);
                }
                ,
                function(err, users, profile, currentUser) { 
                    if (this.ok(err)) {
                        if (!profile) {
                            this(Object.error('not-found', 'Profile not found'));
                        }else {
                            var user = currentUser || users[0];
                            // create new one
                            if (!user) {
                                user =  {
                                    name: profile.name, 
                                    gender: profile.gender || '?',
                                    access_token : ''+Date.now().valueOf()+'-'+Math.random()
                                };
                            }
                            // merge users
                            for (var i = 0, max=users.length; i < max; i++) {
                                var u = users[i] ;
                                if (u._id===user._id) continue;
                                for (var n in u.providers){
                                    if (!user.providers[n]){
                                        user.providers[n] = u.providers[n];
                                    }
                                }
                                Object.notify('db://delete/users#'+u._id,this.cb());
                            } 
                            
                            Object.set(user, 'providers.'+profile.provider, profile);
                           // Object.debug('login user', user);
                            Object.notify({
                                uri : 'db://upsert/users',
                                query : Object.slice(user,['access_token']),
                                doc : user
                            }, this); 
                        }
                    }
                }
                ].concat(ev.callback), ev);    
        }
        ,
        verify : function(ev) {
            var doc = ev.profile;
            doc._raw='';
            doc._json='';
            Object.notify({
                uri : 'db://upsert/profiles'
                , 
                query: {
                    provider:doc.provider, 
                    id: doc.id
                }
                ,
                doc: doc
                , 
                callback : ev.callback
            });
        }
    });
}
  