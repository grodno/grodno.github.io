(function(global) {

    //## [] UI component:
        Object.entity.define('ui/GSheetList extends List', {
            
        
        itemTemplate:'<div class="media">'+
        '<a class="pull-left" href="{url}"><img class="img-rounded media-object" width="64" src="{icon}"></a>'+
        '<div class="media-body">'+
        '<h4 class="media-header">'+
        '<div>{name_be}<br/><small>{name_en}</small></div>'+
        '</h4>'+
        ' </div>'+
        '</div>'+
        '<div class="panel-body">{body}</div>'+
        '<div class="panel-footer"><a href="{url}" target="_blank">{urlName}</a> {category}</div>'
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

            return { 
                
                dataAsyncAdapter : function(err, data) {
                    this.domNode.innerHTML='';
                    return this.normalizeDataIterator(Object.get(data,'input'),[]);
                }
                ,
                normalizeDataIterator: (function(v, i){
                    v.icon = v.icon || '/res/logo120.png';
                    //v.body = v.body.split('<!--more-->')[0];
                    v.url = 'http://s13.ru/archives/'+v.id
                    v.urlName = 'S13'
                    this.push(v);
                }).iterator()  
            }

        }  
    });
    
})(this);



