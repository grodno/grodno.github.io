export const MainModule = /* html */`
<div id="tiles" class="container">
  <Dashboard/>
</div>
`
export const Dashboard = /* html */`
<div class="dashboard columns">
  <div class="column col-6 col-xs-12">
    <div class="card">
      <div class="card-header">
        <div class="card-title h5">Microsoft</div>
        <div class="card-subtitle text-gray">Software and hardware</div>
      </div>
      <div class="card-image"><img class="img-responsive" src="img/chart1.png" alt="OS X El Capitan"></div>
      <div class="card-body">Empower every person and every organization on the planet to achieve more.</div>
      <div class="card-footer"><a class="btn btn-primary" href="#cards">Do</a></div>
    </div>
  </div>
  <div class="column col-6 col-xs-12">
    <div class="card">
      <div class="card-header">
        <div class="card-title h5">Apple</div>
        <div class="card-subtitle text-gray">Hardware and software</div>
      </div>
      <div class="card-image"><img class="img-responsive" src="img/chart6.png" alt="OS X Yosemite"></div>
      <div class="card-body">To make a contribution to the world by making tools for the mind that advance humankind.</div>
      <div class="card-footer">
        <div class="btn-group btn-group-block">
          <button class="btn btn-primary">Buy</button>
          <button class="btn">Buy</button>
          <button class="btn">Buy</button>
        </div>
      </div>
    </div>
  </div>
  <div class="column col-6 col-xs-12">
    <div class="card">
      <div class="card-header">
        <button class="btn btn-primary float-right"><i class="icon icon-plus"></i></button>
        <div class="card-title h5">Google I/O</div>
        <div class="card-subtitle text-gray">Software and hardware</div>
      </div>
      <div class="card-image"><img class="img-responsive" src="img/chart2.png" alt="macOS Sierra"></div>
      <div class="card-body">An immersive, three-day experience focused on exploring the next generation of technology, mobile and beyond.</div>
    </div>
  </div>
  <div class="column col-6 col-xs-12">
    <div class="card">
      <div class="card-image"><img class="img-responsive" src="img/chart5.png" alt="OS X El Capitan"></div>
      <div class="card-footer"><a class="btn btn-primary" href="#cards">Buy</a><a class="btn btn-link" href="#cards">Share</a></div>
      <div class="card-body"><strong>Surface Studio</strong>. Turn your desk into a Studio. Surface Studio is designed for the creative process.</div>
    </div>
  </div>
  <div class="column col-6 col-xs-12">
    <div class="card">
      <div class="card-header">
        <div class="card-title h5">Apple</div>
        <div class="card-subtitle text-gray">Hardware and software</div>
      </div>
      <div class="card-body">To make a contribution to the world by making tools for the mind that advance humankind.</div>
      <div class="card-image"><img class="img-responsive" src="img/chart3.png" alt="macOS Sierra"></div>
    </div>
  </div>
  <div class="column col-6 col-xs-12">
    <div class="card">
      <div class="card-header">
        <div class="card-title h5">Google</div>
        <div class="card-subtitle text-gray">Software and hardware</div>
      </div>
      <div class="card-body">Organize the world’s information and make it universally accessible and useful.</div>
      <div class="card-image"><img class="img-responsive" src="img/chart4.png" alt="OS X Yosemite"></div>
      <div class="card-footer"><a class="btn btn-primary" href="#cards">Search</a><a class="btn btn-link" href="#cards">Share</a></div>
    </div>
  </div>
</div>`
  export const  News = /* html */`
  <div id="tiles" class="container">
    <h3 class="s-title"><a href="#tiles" class="anchor" aria-hidden="true">#</a><span>News</span></h3>
    <div class="docs-note">
      <p>Most noticed local news aggregation.</p>
    </div>
    <NewsList ui:props="<- news"/>
  </div>`
  export const NewsList = /* html */`<div class="columns">
    <div class="column col-9 col-sm-12" ui:each="item of items">
      <div class="tile">
        <div class="tile-icon">
          <figure class="avatar avatar-lg">
            <img src="assets/img/avatar-1.png" alt="Avatar"/>
          </figure>
        </div>
        <div class="tile-content">
          <p class="tile-title">{{item.name}}</p>
          <p class="tile-subtitle text-gray">{{item.content}}</p>
          <p>
            <button class="btn btn-primary btn-sm">Like</button>
            <button class="btn btn-sm">Save</button>
          </p>
        </div>
      </div>
    </div>
  </div>`
