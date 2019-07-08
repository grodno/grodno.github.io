export const VisitsModule= /* html */`
  <div id="tiles" class="container">
  <div class="docs-demo columns">
    <div class="column col-xs-8 ">
      <Tags data=":specialty" mode="single" field="specialty" changed="{{assign}}"/> 
      </div>
      <div class="column col-xs-4 text-right">
        <SearchBar class="right" changed="{{assign}}"/>
      </div>
    </div>
    <Medicians data="<- db:index/medician/city/{{city.id}}?specialty={{specialty}}&amp;name={{search}}#once" id="{{id}}"/>
  </div>`