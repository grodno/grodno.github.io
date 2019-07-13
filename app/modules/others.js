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
export const RecordsModule = /* html */`
  <ui:fragment>
    <Tabs data=":TABS"/>
    <Filter/>
    <Table data="<- issues" columns=":COLUMNS" value="{{current}}" valueChanged="{{onItemSelected}}"/>
    <Pagination/>
    <button class="btn tooltip tooltip-left round" style="position:fixed; right:1rem; bottom:1rem; width: 2rem;" data-tooltip="Lorem ipsum dolor sit amet">+{{touch}}</button>
  </ui:fragment>`

export const ReportsModule = /* html */`
  <ui:fragment>
    <Filter data=":medician_form" value="{{filter}}" changed="{{assign}}"/>
    <Table
      data="<- db:index/medician/city/{{city.id}}"
      filter="{{filter}}" 
      sortBy="{{sortBy}}" 
      columns=":medician_form"
      onItem="-> nav:openItem"
      onHeader="-> nav:sort"
      selection="{{selection}}" selectionChanged="{{assign}}"
      />
    <BigRedButton tooltip="Add a new record" action="-> nav:addNew"/>
    <Modal ui:if="id" open="{{open}}" title="Edit record" close="-> nav:close">
      <Form fields=":medician_form" data="<- db:one/medician/{{id}}" submit="-> db:update/medician"/>
    </Modal>
    <Modal ui:if="newEntry" open="{{open}}" title="Add a new record" close="-> nav:close">
      <Form fields=":medician_form" data="{{newEntry}}" submit="-> db:create/medician"/>
    </Modal>
  </ui:fragment>`
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
export const AnalyticsModule = /* html */`
  <div id="tiles" class="container">
    <h3 class="s-title"><a href="#tiles" class="anchor" aria-hidden="true">#</a><span>Dashboard</span></h3>
    <div class="docs-note">
      <p>Most noticed info aggregation.</p>
    </div>
    <img src="img/dashboard.png" width="100%"/>
  </div>`
