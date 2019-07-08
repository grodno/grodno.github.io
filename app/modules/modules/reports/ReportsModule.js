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
