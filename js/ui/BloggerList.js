(function(global){
    
    Object.entity.define('ui/BloggerList extends List', {
        
        itemTemplate:'<div class="media panel-body"><span class="pull-left"><a href="{url}">'+
        '<img class="img-rounded media-object" width="64" src="{icon}">{labels}</a></span>'
        +'<div class="media-body"><h4 class="media-header">{name}</h4><p>{content}</p></div></div>'
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
                v.icon = Object.get(v,'author.image.url')||'/img/chess-pawn3.png';
                v.author = Object.get(v,'author.displayName');
                    
                var p = v.content.indexOf('<a name=\'more\'></a>');
                if (p!=-1){
                    v.content = v.content.substring(0, p) +'<a href="'+v.url+'">Подробнее → </a>';
                }
                
                v.labels = (v.labels && v.labels.length) ?('<br/><span class="label label-info">'+v.labels.join('</span><br/><span class="label label-info">')+'</span>') :'';
                
                // skip first top item
                if (T.skipFirstTop && !T.topItem && v.labels && (v.labels.indexOf('top')>-1))   {
                    T.topItem = v;
                    return;
                }
                    
                this.push(v);
                
            }).iterator();
            
            var _htmlAsyncAdapter= function(err, ev) {
                this.datum.content = ev.value;
                return String.formatWithMap(this.itemTemplate, this.datum);
            }
            return { 
                
                init : function() {
                    
                    _super.init.apply(this, arguments);
                    
                }
                ,
                dataAsyncAdapter : function(err, data) {
                    
                    this.domNode.innerHTML='';
                    
                    return normalizeItemDataIterator(Object.get(data,'items'),[], this);
                    
                }
                ,
                childrenItemAdapter :function(datum, i) {
                    return {
                        id:'html',
                        htmlUrl:'lexio://#'+datum.content,
                        htmlAsyncAdapter: _htmlAsyncAdapter,
                        itemTemplate: this.itemTemplate,
                        datum : datum
                    }
                }
                
                
            }

        }  
    });

})(this)

