(function(global) {

    //## [] UI component:
    // @define UI [Application] entity
    Object.entity.define('ui/Application extends box', {
        
        siteUrl1:'[jsonp]'+APP.SOURCES.SITE
        ,
        properties:['nonequal:page', 'content', 'site','html:html']
        , 
        contentUrlExpression : '"page://"+(${@.page}||"home")'
        ,
        methods: function(_super) {
            var _host = APP.LOCATION.authority;
            
            var _page = function(u){
                
                var h = (u.hash && (u.hash[0]=='!' || u.hash[0]=='~')) ? u.hash.substring(1) : null;
                if (h) return h;
                
                var ispage = u.type? (_host===u.authority) : (u.id.substr(0,2)!=='//'), p = u.path[0];
                return (ispage && (p.indexOf('.')==-1))? p : null;
            }
            return {
                init : function() {
                    var T = this;

                    _super.init.apply(this, arguments);

                    global.onclick = function (ev0){ 
                        var ev = Object.dom.createEvent(ev0);
                        var href = ev.target.href;
                        if (href) {
                            var h = _page(Object.parseUri(href));
                            if (h!==null) {
                                T.go(h);
                                return false;
                            }
                        }
                        return true;
                    }
                    
                    this.go(_page(APP.LOCATION) || null);
                }
            }
        }
        ,
        // go to page
        go: function(h) {
            h = h || '';
            this._set('page', h);
            try {
                console.log(h);
                //global.history.pushState({}, null, h?((APP.LOCATION.hash = '~'+h), ''+APP.LOCATION):'');
            } catch (e) {
                        
            }
        }
        ,
        // adopt html content
        contentAsyncAdapter: function(err, t) {
            this.setChildren(null);
            this._set('html', '');
            
            if (!t) return '<p class="label label-error">Page '+this.page+' is unavailable</p>';
            
            if (t.substring(0,1)=='{') {
                this.setChildren(Object.parse(t));
            } else {
                this._set('html', t);
            } 
            return '';
        }
        ,
        siteChanged : function(ev) {
            //Object.dom.init(this);
            Object.log(ev.value)
        }  
        ,
        htmlChanged : function() {
            Object.dom.init(this);
        }

    });    
    
})(this);



