(function(global){
    
    Object.entity.define('ui/BloggerList extends List', {
        
        itemTemplate:'<div class="media panel-body"><span class="pull-left"><a target="_blank" href="{url}">'+
        '<img class="img-rounded media-object" width="32" src="{icon}"></a></span>'
        +'<div class="media-body"><h5 class="media-header">{name} <a target="_blank" href="{url}">далее&nbsp;→</a></h5></div></div>'//<p>{content}</p>
        ,
        itemStyle:'panel panel-default'
        ,
        domNodeType:'ul'
        ,
        style:'media-list'
        ,
        css:'list-style: none;'
        ,
        methods: function(_super) {
            
            var normalizeItemDataIterator = (function(v, i, T){
                
                v.name = Object.get(v,'title');
                v.content = Object.get(v,'content');
                v.url = Object.get(v,'url');
                v.icon = (Object.get(v,'author.image.url')||'').replace('http://img2.blogblog.com/img/b16-rounded.gif','') || 'res/logo120.png';
                v.author = Object.get(v,'author.displayName');
                    
              //var p = v.content.indexOf('<a name=\'more\'></a>');
              // v.content = ((p!=-1)?v.content.substring(0, p):v.content) ;
                
                
                v.labels = (v.labels && v.labels.length) ?(' <span class="label label-info">'+v.labels.join('</span> <span class="label label-info">')+'</span>') :'';
                
                // skip first top item
                if (T.skipFirstTop && !T.topItem && v.labels && (v.labels.indexOf('top')>-1))   {
                    T.topItem = v;
                    return;
                }
                    
                this.push(v);
                
            }).iterator();
            
            var _htmlAsyncAdapter= function(err, ev) {
                this.datum.content = ev.value ;
                return String.formatWithMap(this.itemTemplate, this.datum);
            }
            return { 

                dataAsyncAdapter : function(err, data) {
                    
                    this.domNode.innerHTML='';
                    
                    return normalizeItemDataIterator(Object.get(data,'items'),[], this);
                    
                }
                ,
                childrenItemAdapter :function(datum, i) {
                    return {
                        id:'html',
                        html:String.formatWithMap(this.itemTemplate, datum)+'',
                    }
                }
                
                
            }

        }  
    });

})(this)

