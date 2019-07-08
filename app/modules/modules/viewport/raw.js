
export const Toast= /* html */`
  <div class="toast toast-primary" style="position:fixed; right:5rem; bottom:1rem; width: 20rem;">
    <button class="btn btn-clear float-right" click="->" data-touch="{{text}}"></button>
    <p>{{top.ts}}</p>
  </div>
  `
export const Header= /* html */`
  <header class="navbar bg-secondary">
    <section class="navbar-section mx-2">
      <Breadcrumbs ui:props="<- nav://item"/>
    </section>
    <section class="navbar-center">
        <img src="img/logo.png" alt="Spectre.css" height="50" width="50"/>
    </section>
    <section class="navbar-section mx-2">
      <CurrentCity data="<- db://dict/city" city="<- nav://city" onChanged="-> nav://update/city"/>
      <UserIcon/>
    </section>

  </header>`
export const UserIcon = /* html */` 
<div class="dropdown">
        <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
          <i class="icon icon-more-vert"></i>
        </a>
        <!-- menu component -->
        <ul class="menu" style="right:0;left:auto;">
        <UserBar ui:props="<- user:info"/>
        </ul>
      </div>
`
export const CurrentCity= /* html */` 
<div class="dropdown">
        <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
          {{city.name}}<i class="icon icon-caret"></i>
        </a>
        <!-- menu component -->
        <ul class="menu" style="right:0;left:auto;">
          <li ui:each="item of data" class="menu-item active:{{item.id}}=={{city.id}}" data-id="{{item.id}}" data-name="{{item.name}}" click="{{onChanged}}">
            <a>{{item.name}}</a>
          </li>
        </ul>
      </div>
`

export const Sidebar= /* html */`
  <div class="off-canvas off-canvas-sidebar-show">
    <a class="off-canvas-toggle btn btn-primary btn-action show-lg" href="#sidebar">
      <i class="icon icon-menu"/>
    </a>
    <div id="sidebar" class="off-canvas-sidebar">
      <ui:transclude key="aside"/>
    </div>
    <a class="off-canvas-overlay" href="#"></a>
    <div class="off-canvas-content">
      <ui:transclude key="content"/>
    </div>
  </div>
  `
export const Tabs= /* html */`
  <ul class="tab tab-block">
    <li class="tab-item" ui:each="item of data">
      <a href="#tab?tab={{item.value}}">{{item.name}}</a>
    </li>
  </ul>
  `
export const UserBar= /* html */`
  <ui:fragment>
    <div class="tile tile-centered">
      <div class="tile-icon">
        <div class="example-tile-icon">
        <figure class="avatar avatar-lg">
          <img src="img/person1.png" alt="Avatar"/>
        </figure>
        </div>
      </div>
      <div class="tile-content">
        <div class="tile-title">{{name}}</div>
        <div class="tile-subtitle text-gray">{{role}} · 1 Jan, 2017</div>
      </div>
      <!-- <div class="tile-action">
        <button class="btn btn-link">
          <i class="icon icon-more-vert"></i>
        </button>
      </div> -->
    </div>
  </ui:fragment>
  `
export const Aside= /* html */`
  <div class="panel" style="height: 100%;">
  <div class="panel-header">
    <div class="panel-title">
    <h1>:aibolit</h1>
    </div>
  </div>
  <div class="panel-nav">
    <!-- navigation components: tabs, breadcrumbs or pagination -->
  </div>
  <div class="panel-body">
    <NavTree data="<- nav://items"/>
  </div>
  <div class="panel-footer">
    Settings
  </div>
  </div>
  `
export const NavTree= /* html */`
  <ul class="nav">
    <li class="nav-item {{item.cl}}" ui:each="item of data">
      <a href="#{{item.id}}"><span>{{item.name}}</span><span ui:if="item.weight" class="label label-error">{{item.weight}}</span></a>
      <NavTree ui:if="item.subs" data="{{item.subs}}"/>
    </li>
  </ul>
  `

