export const PatientsModule = /* html */`
<div id="tiles" class="container">
<div class="docs-demo columns">
  <div class="column col-xs-8 ">
    <Tags data=":gender" mode="single" field="gender" changed="{{assign}}"/> 
    </div>
    <div class="column col-xs-4 text-right">
      <SearchBar class="right" changed="{{assign}}"/>
    </div>
  </div>
  <Patients data="<- patients?gender={{gender}}&amp;search={{search}}" current="<- id"/>
</div>`

export const Patients = /* html */`
<div class="columns">
  <div class="column col-4" style="height: 100%; overflow-y: auto;">
    <div class="columns" style="">
      <div class="column col-11 col-sm-12" ui:each="item of data">
        <PatientItem ui:props="{{item}}" current="{{current}}"/>
      </div>
      <div style="height:10rem"></div>
    </div>
  </div>
  <div class="column col-8" ui:if="current" style="height: 100%; overflow-y: auto;">
    <Form fields=":patient_form" data="<- patient/{{current}}" submit="-> update"/>
  </div>
</div>`

export const PatientItem = /* html */`
<div class="panel m-1 bg-secondary:{{id}}=={{current}}">
  <div class="panel-header centered">
  <figure class="avatar avatar-lg centered text-ellipsis">
    <img src="img/doc2.png" alt="Avatar">
  </figure>
    <div class="panel-title"><a class="" href="#patients/id/{{id}}">{{name}}</a></div>
  </div>
  <div class="panel-nav px-1 py-1 centered">
  {{specialty}}
  </div>
  
</div>`