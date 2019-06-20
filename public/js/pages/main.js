export const MainModule = /* template */ `    
<div class="container grid-lg">
    <div class="columns">
        <div class="column col-12"><h2>Olgerd na dobu dnia</h2></div>
        <div class="column col-6">
            <CardNews data="<- latestNews"/>
        </div>
        <div class="column col-6">
            <CardRatio data="<- latestRatio"/>
        </div>

        <div class="column col-6">
            <CardLinks caption=":media" data=":media_links"/>
        </div>

        <div class="column col-6">
            <CardLinks caption=":parners" data=":media_links"/>
        </div>
    </div>
</div>`;

export const CardNews = /* template */`
<div class="card">
    <div class="card-image">
        <img src="{{image}}" class="img-responsive"/>
    </div>
    <div class="card-header">
        <h5 class="card-title">Naviny dnia</h5>
        <div class="card-subtitle text-gray">Software and hardware</div>
    </div>
    <div class="card-body">
        <li ui:each="e of data"><a href="{{e.link}}" class="item">{{e.subject|subject|translit}}</a></li>
    </div>
    <div class="card-footer">
        <a class="btn btn-primary btn-sm" href="#module/news">Bolsh</a>
    </div>
</div>
`;

export const Toast = /* html */`
  <div class="toast toast-primary" style="position:fixed; right:5rem; bottom:1rem; width: 20rem;">
    <button class="btn btn-clear float-right" click="->" data-touch="{{text}}"></button>
    <p>{{top.ts}}</p>
  </div>
  `;
export const Header = /* html */`
  <header class="navbar bg-secondary">
    <section class="navbar-section mx-2">
      <Breadcrumbs ui:props="<- nav://item"/>
    </section>
    <section class="navbar-center">
        <img src="/assets/grodno2.svg" alt="Spectre.css" height="40" width="40"/>
    </section>
    <section class="navbar-section mx-2">
    <UserBar ui:props="<- user:info"/>

    </section>
  </header>`;

export const Tabs = /* html */`
  <ul class="tab tab-block">
    <li class="tab-item" ui:each="item of data">
      <a href="#tab?tab={{item.value}}">{{item.name}}</a>
    </li>
  </ul>
  `;

export const Aside = /* html */`
  <div class="panel" style="height: 100%;">
  <div class="panel-header">
    <div class="panel-title">
    <h1>:olgard</h1>
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
  `;
export const NavTree = /* html */`
  <ul class="nav">
    <li class="nav-item {{item.cl}}" ui:each="item of data">
      <a href="#{{item.id}}"><span>{{item.name}}</span><span ui:if="item.weight" class="label label-error">{{item.weight}}</span></a>
      <NavTree ui:if="item.subs" data="{{item.subs}}"/>
    </li>
  </ul>
  `;
export const Home = /* html */`
  <p>Home</p>
  `;

export const Navs = /* html */`
  <div class="panel" style="height: 100%;">
  <div class="panel-header">
    <div class="panel-title">
      <UserBar ui:props="me"/>
    </div>
  </div>
  <div class="panel-nav">
    <!-- navigation components: tabs, breadcrumbs or pagination -->
  </div>
  <div class="panel-body">
    <NavTree data=":nav"/>
  </div>
  <div class="panel-footer">
    Settings
  </div>
  </div>
  `;

export const Breadcrumbs = /* html */`
  <ul class="breadcrumb">
  <li class="breadcrumb-item">
    <div class="dropdown">
        <a class="btn btn-link dropdown-toggle" tabindex="0">Naviny<i class="icon icon-caret"></i></a>
        <ul class="menu">
          <li class="menu-item">
            <a href="#dropdowns">
              Naviny
            </a>
          </li>
          <li class="menu-item">
            <a href="#dropdowns">
              Calendar
            </a>
          </li>
          <li class="menu-item">
            <a href="#dropdowns">
              Ljudzi
            </a>
          </li>
        </ul>
      </div>
  </li>
</ul>
`;
