/* 
 * pubsubhubbub module.
 * 
 * Hub subscribe:
 * https://pubsubhubbub.appspot.com/subscribe
 * 
 * Hub Subscription Details
 * https://pubsubhubbub.appspot.com/subscription-details?hub.callback=http%3A%2F%2Fgrodna.eu01.aws.af.cm%2Fpubsub%2F&hub.topic=http%3A%2F%2Ffeeds.feedburner.com%2Fgrodno-news%3Fformat%3Dxml&hub.secret=
 * 
 * Feed
 * http://feeds.feedburner.com/grodno-news
 * 
 * Endpoint
 * http://grodna.eu01.aws.af.cm/pubsub
 * 
 * Items
 * http://grodna.eu01.aws.af.cm/pubsub/query
 * 
 * 
 * @see http://pubsubhubbub.googlecode.com/svn/trunk/pubsubhubbub-core-0.3.html#toc
 * 
 * 
 */

var verificationCode = "12345678";

var categoryIterator = (function(v){
    this.push(Object.get(v, '$.term'));
}).iterator()

//
// Verify subscription
// http://pubsubhubbub.googlecode.com/svn/trunk/pubsubhubbub-core-0.3.html#verifysub
exports.get = function(ev) {
    ev.send(ev.options['hub.challenge'], Object.http.MIME.TXT);
}

// Recieve feed
exports.post = function(ev) {
    
    var entries = Object.get(ev.payload,'feed.entry') || Object.get(ev.payload,'entry') || [];
    
    for (var i = 0, max = entries.length; i < max; i++) {
        var e = entries[i];
        var upd = (Date.parse(Object.get(e, 'updated.0'),'yyyy-MM-ddTHH:mm:ss') || Date.now()).valueOf();
        var doc = {
            id: Object.get(e, 'feedburner:origLink.0')
            ,
            url: Object.get(e, 'feedburner:origLink.0')
            ,
            name: Object.get(e, 'title.0._')
            ,
            content : Object.get(e, 'content.0._') ||Object.get(e, 'summary.0._') || ''
            ,
            author: {name:Object.get(e, 'author.0.name.0')}
            ,
            updated: upd
            ,
            ts: upd
            ,
            tags: categoryIterator(Object.get(e, 'category'),[])
        };
    
        Object.notify({
            uri : 'db://update/items',
            payload:doc, 
            query:{
                id:doc.id
            },
            options:{
                upsert:true, 
                first:true
            }
        });
    } 

    return {
        ok:true
    };
}
exports.getQuery = function(ev) {
    Object.notify('db://query/items', this);
};

exports.getSync = function(ev) {
    var ts = ev.uri.params.from||0;
    var q = ts ? {ts:{$gte:ts}} : {}
    Object.notify({uri:'db://query/items', query:q}, this);
}

   
exports.getVk = function(ev) {
    Object.notify('https://api.vk.com/method/newsfeed.get?limit=5&access_token='+this.options.access_token, this);
};
   
exports.getVkPermission = function(ev) {
    Object.notify('https://api.vk.com/method/account.getAppPermissions?access_token='+this.options.access_token, this);
};
