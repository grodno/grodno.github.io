export const Breadcrumbs = /* html */`
<ul class="breadcrumb">
<li class="breadcrumb-item" ui:each="step in path">
  <a href="#module/{{step.id}}">{{step.name}}</a>
</li>
<li class="breadcrumb-item" ui:if="modes.length">
  <div class="dropdown">
      <a class="btn btn-link dropdown-toggle" tabindex="0">{{current.name}}<i class="icon icon-caret"></i></a>
      <ul class="menu">
        <li class="menu-item" ui:each="li in modes">
          <a href="#module/{{step.id}}/mode/{{li.id}}">{{li.name}}</a>
        </li>
      </ul>
    </div>
</li>
</ul>
`
