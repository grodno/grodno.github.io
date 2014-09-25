Object.entity.define 
    id:"widgets.BloggerList extends List"
    itemTemplate: """
    <div class="media panel-body">
        <span class="pull-left"><a target="_blank" href="{{url}}"><img class="img-rounded media-object" width="32" src="{{icon}}"></a></span>
        <div class="media-body">
            <h5 class="media-header">{{name}} <a target="_blank" href="{{url}}">далее&nbsp;→</a></h5>
        </div>
    </div>
    """
    #<p>{{content}}</p>
    itemStyle: "panel panel-default"
    domNodeType: "ul"
    style: "media-list"
    css: "list-style: none;"
    
    methods: (_super) ->

        dataAsyncAdapter: (err, data) ->
            @domNode.innerHTML = ""
            items = Object.prop(data, "items") or []
            for v in items
                v.name = Object.prop(v, "title")
                v.icon = (Object.prop(v, "author.image.url") or "").replace("http://img2.blogblog.com/img/b16-rounded.gif", "") or "/res/logo120.png"
                v.author = Object.prop(v, "author.displayName")
                v.labels = (if (v.labels and v.labels.length) then (' <span class="label label-info">' + v.labels.join('</span> <span class="label label-info">') + "</span>") else "")
            items

        childrenItemAdapter: (datum, i) ->
            id: "Html" 
            html: String.template(@itemTemplate, datum)
