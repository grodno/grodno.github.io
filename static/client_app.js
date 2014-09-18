(function (global) {
    
    var APP = global.APP;
    
    APP.LOCATION = Object.parseUri(''+global.location);

    APP.DEBUG = (APP.LOCATION.authority.indexOf('local')+1) || (APP.LOCATION.authority==='c9.io');

    if (APP.DEBUG || APP.LOCATION.params.debug) {
        
        APP.VERSION =  -1;
    
    }

    // register async source for cached resources
    Object.cache.createJSSource(APP.VERSION, 'js/{0}.js?v=');   
   
    // entity type factory
    Object.entity.ENTITY_TYPE_FACTORY_URL = 'js://{0}';

    // register async source for js libraries
    Object.cache.createJSSource(('v'+APP.VERSION).split('.')[0], 'libs/{0}.js?v=', 'lib');

    // register async source for pages
    Object.entity.create({
        id:'CachedResourceProvider:page', 
        version: APP.VERSION, 
        urlTemplate:'page/{0}.html?v='+APP.VERSION,
        cacheDeserializer: Function.NONE
    });

    // register data provider for Blogger posts
    Object.entity.create({
        id:'CachedResourceProvider:gsheet' , 
        version: ''+Math.round((new Date()).valueOf() / 86400000),
        scope : 'session', 
        urlTemplate:'[jsonp]https://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?id={0}&doc=0AsS3yCcHWEuCdHNUamh2OWVvQWh0a3lTdnM5WW5ZM2c'
    });

    // register data provider for Blogger posts
    Object.entity.create({
        id:'CachedResourceProvider:blogger' , 
        version: ''+Math.round((new Date()).valueOf() / 86400000),
        scope : 'session', 
        urlTemplate:'[jsonp]https://www.googleapis.com/blogger/v3/blogs/1638693468845489013/posts?{0}&key='+APP.GOOGLE_API_KEY
    });
    
    // register async source for lexio processing
    Object.entity.create({
        id:'CachedResourceProvider:lexio_meta', 
        version: ('v'+APP.VERSION),//''+Math.round((new Date()).valueOf() / 86400000),
        scope1 : 'session', 
        urlTemplate:'[jsonp]'+APP.GOOGLE_SHEETS_URI+'{0}'
    });    
    
    // local settings storage
    Object.entity.create("WebStorage://#settings");

})(this);