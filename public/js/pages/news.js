export const NewsModule = /* template */ `
<div class="container">
    <h3 class="s-title">Kroniki Olgarda</h3>
    <NewsList data="<- db:index/news" sortBy="created_at"/>
    <BigRedButton tooltip="Add a new record" action="-> nav:addNew"/>
    <NewsUpdateModal ui:if="id" id="{{id}}" open="{{open}}" data="<- db:one/news/{{id}}"/>
    <NewsCreateModal ui:if="newEntry" open="{{open}}" data="{{newEntry}}"/> 
</div>`

export const NewsCreateModal = /* template */ `
<Modal ui:if="" open="{{open}}" title="Add a new record" close="-> nav:close">
  <Form fields=":news_form" data="{{data}}" changed="{{assign}}"/>
  <ui:fragment ui:key="footer">
    <button class="btn btn-primary" data="{{data}}" click="-> db:create/news">:create_new</button>
  </ui:fragment>
</Modal>`

export const NewsUpdateModal = /* template */ `
<Modal ui:if="id" open="{{open}}" title="Edit record ({{id}})" close="-> nav:close">
  <Form fields=":news_form" data="{{data}}" changed="{{assign}}"/>
  <ui:fragment ui:key="footer">
    <button class="btn btn-primary" data="{{data}}" click="-> db:update/news">:update</button>
    <button class="btn btn-danger" click="-> db:delete/news/{{id}}">:delete</button>
  </ui:fragment>
</Modal>`

export const NewsListItemFeatured = /* template */ `
    <div class="card column col-12 col-sm-12">
        <div class="card-image">
            <img src="{{image}}" class="img-responsive"/>
        </div>
        <div class="card-header">
            <div class="card-title h5">{{subject|subject|translit}}</div>
            <div class="card-subtitle text-gray">Software and hardware</div>
        </div>
        <div class="card-body">
            {{preview|translit}}
        </div>
        <div class="card-footer">
            <button class="btn btn-primary btn-sm">Do</button>
        </div>
    </div>`

// NewsListItem
export const NewsListItem = /* template */ `
<div class="column col-9 col-sm-12">
  <div class="tile">
    <div class="tile-icon">
        <figure class="avatar avatar- bg-primary" data-initial="{{subject|initials}}"><img src="{{image}}" class="img-responsive"  data-value="{{id}}" click="-> nav:openItem"/></figure>
      </div>
    <div class="tile-content">
        <p class="tile-title">
        <h5><a class="header" data-value="{{id}}" click="-> nav:openItem">{{subject|subject|translit}}</a></h5>
        <small>{{created_at}}</small>
        <small class="mx-2"><a href="{{link}}" target="_blank">{{link|urlHost}}</a></small>
        <small class="mx-2">{{tags}}</small>
        </p>
        <p class="tile-subtitle">
            <span><img src="/assets/grodno2.svg" height="10" width="10"/> {{preview|translit}}</span>
            <!--span ui:each="tag of tags" class="chip">{{tag}}</span-->
        </p>
    </div>
  </div>
</div>`

export const NewsList = /* html */ `
<div>
  <div><Tags data="{{data}}" selectionChanged="{{assign}}"/></div>
  <div class="columns">
      <NewsListItem ui:props="{{item}}" ui:each="item of data|transformNews"/>
      <div class="column col-9 col-sm-12 loading" ui:if="!data">
        <ui:else><h6 class="column col-9 col-sm-12" ui:if="!data.length">Empty list</h6></ui:else>
      </div>
  </div>
</div>
`
