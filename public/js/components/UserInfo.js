export const UserBar = /* html */`
  <div  class="float-right">
  <ui:fragment ui:if="isAnonymous">
    <ui:then>
      <a click="-> user:login" class="anchor" aria-hidden="true">login</a>
    </ui:then>
    <ui:else>    
      <div class="tile tile-centered">
        <div class="tile-icon"  ui:if="photoURL">
          <div class="example-tile-icon">
          <figure class="avatar avatar">
            <img src="{{photoURL}}" alt="Avatar"/>
          </figure>
          </div>
        </div>
        <div class="tile-content">
          <div class="tile-title" ui:if="displayName">{{displayName}}</div>
          <a class="tile-subtitle text-gray" href="mailto:{{email}}">{{email}}</a>
        </div>
        <!-- <div class="tile-action">
          <button class="btn btn-link">
            <i class="icon icon-more-vert"></i>
          </button>
        </div> -->
      </div>
    </ui:else>
  </ui:fragment>
  </div>
  `

export class UserInfo {
  TEMPLATE () {
    return /* html */`<div class="ui raised segment">
    <a class="ui yellow image label">
        <i class="jp flag"></i>
        {{profile.name}}
        <div class="detail">Citizen</div>
    </a>
    <div class="ui divided selection list">
      <div class="item" each="contact of contacts">
        <div class="ui {{contact.color}} horizontal label">{{contact.type}}</div>
        <a href="{{contact.link}}" target="_blank">{{contact.text}}</a>
      </div>
    </div>
  </div>`
  }
}
