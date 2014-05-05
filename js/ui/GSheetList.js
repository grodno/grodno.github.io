(function(global) {

    //## [] UI component:
        Object.entity.define('ui/GSheetList extends List', {
            
        
        itemTemplate:'<div class="media panel-body"><span class="pull-left"><a href="//s13.ru/archives/{id}">'+
        '<img class="img-rounded media-object" width="64" src="{icon}"></a></span>'
        +'<div class="media-body"><h4 class="media-header">{name}<br/><small><a href="//s13.ru/archives/{id}" target="_blank">S13.RU</a> {category}</small></h4><p>{body}</p>'
        +' </div></div>'
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
                    //this.normalizeItemDataIterator(this.normalizeCellsIterator(,[]),[])
                    return Object.get(data,'input');
                }
                ,
                normalizeItemDataIterator: (function(v, i){
                    if (i<2) return;
                    this.push(v);
                }).iterator()  
                ,
                normalizeCellsIterator: (function(v){
                    var key = Object.get(v,'title.$t'), col= key[0], row=Number(key.substring(1));
                    ;
                    if (!this[row]){
                        this[row] = {};
                    }
                    this[row][col] = Object.get(v,'content.$t');
                }).iterator()  
            }

        }  
    });
    
})(this);



