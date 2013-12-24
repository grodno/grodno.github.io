(function (global) {
    
    APP.LOCATION = Object.parseUri(''+global.location);

    APP.DEBUG = (APP.LOCATION.authority.indexOf('local')+1);

    if (APP.DEBUG) {
        
        APP.VERSION =  -1;
    
    }

    // register async listener for cached resources
    Object.cache.createJSSource(APP.VERSION);   
   
    // entity type factory
    Object.entity.ENTITY_TYPE_FACTORY_URL = 'js://{0}';
            
    // register async listener for pages
    Object.entity.create({
        id:'CachedResourceProvider:page', 
        version: APP.VERSION, 
        urlTemplate:'/page/{0}.html?v='+APP.VERSION,
        cacheDeserializer: Function.NONE
    });

    // register data provider for Blogger posts
    Object.entity.create({
        id:'CachedResourceProvider:blogger' , 
        version: ''+Math.round((new Date()).valueOf() / 86400000),
        scope : 'session', 
        urlTemplate:'[jsonp]https://www.googleapis.com/blogger/v3/blogs/1638693468845489013/posts?{0}&key='+APP.GOOGLE_API_KEY
    });
    
    Object.entity.create({
        id:'CachedResourceProvider:lexio_meta', 
        version: '1',//''+Math.round((new Date()).valueOf() / 86400000),
        scope1 : 'session', 
        urlTemplate:'[jsonp]'+APP.GOOGLE_SHEETS_URI+'{0}'
    });    
    
    // local settings storage
    Object.entity.create("WebStorage://#settings");

    
    

})(this);