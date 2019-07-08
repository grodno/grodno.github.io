export const Medicians = /* html */`
<div class="columns">
  <div class="column col-4" style="height: 100%; overflow-y: auto;">
    <div class="columns" style="">
      <div class="column col-11 col-sm-12" ui:each="item of data">
        <MedicianItem ui:props="{{item}}" current="{{id}}"/>
      </div>
      <div style="height:10rem"></div>
    </div>
  </div>
  <div class="column col-8" ui:if="id">
    <Form fields=":medician_form" data="<- medician/{{id}}" submit="-> update"/>
  </div>
</div>`

export const MedicianItem = /* html */`
<div class="panel m-1 bg-secondary:{{id}}=={{current}}">
  <div class="panel-header centered">
  <figure class="avatar avatar-lg centered text-ellipsis">
    <img src="img/doc2.png" alt="Avatar">
  </figure>
    <div class="panel-title"><a class="" href="#visits?id={{id}}">{{name}}</a></div>
  </div>
  <div class="panel-nav px-1 py-1 centered">
  {{specialty}}
  </div>
  
</div>`

export const MedicianItem2 = /* html */`
<div class="tile">
  <div class="tile-icon">
    <figure class="avatar avatar-lg">
      <img src="img/doc2.png" alt="Avatar">
    </figure>
  </div>
  <div class="tile-content">
    <p class="tile-title"><a href="#visits/id/{{id}}">{{name}}</a></p>
    <p class="tile-subtitle text-gray">{{specialty}}</p>
  </div>
</div>`