export const RecordsModule = /* html */`
  <ui:fragment>
    <Tabs data=":TABS"/>
    <Filter/>
    <Table data="<- issues" columns=":COLUMNS" value="{{current}}" valueChanged="{{onItemSelected}}"/>
    <Pagination/>
    <button class="btn tooltip tooltip-left round" style="position:fixed; right:1rem; bottom:1rem; width: 2rem;" data-tooltip="Lorem ipsum dolor sit amet">+{{touch}}</button>
  </ui:fragment>`