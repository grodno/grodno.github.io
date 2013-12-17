(function(global) {

    //## [] UI component:
        Object.entity.define('TournamentsList extends List', {
        itemTemplate:'<hr/><dt><h5>{name} <span style="float:right;" class="label">{date}, {location}</span></h5></dt><dd class="row"><div class="span2"><a href="{url}" target="_blank"><img src="{icon}" class="img-polaroid"/><br/>подробнее...</a></div>'
        ,
        methods: function(_super) {

            return { 
                
                dataAsyncAdapter : function(err, data) {
                    this.domNode.innerHTML='';
                    return this.normalizeItemDataIterator(this.normalizeCellsIterator(Object.get(data,'feed.entry'),[]),[]);
                }
                ,
                normalizeItemDataIterator: (function(v, i){
                    if (i<2) return;
                    
                    v.date = Object.get(v,'A');
                    v.name = Object.get(v,'B');
                    v.location = Object.get(v,'C');
                    v.url = Object.get(v,'D');
                    v.icon = Object.get(v,'E');
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



