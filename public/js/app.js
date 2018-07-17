import { humanize, pipes, proper } from './core/utils.js'
import R from './res.js'
import { Dispatcher } from './dispatcher.js'
import { version } from './config.js'

export class ModuleContainer {
  TEMPLATE () {
    return /* template */` 
<ui:fragment>
    <Header/>
    <ui:moduleType ui:props="{{context}}"/>
</ui:fragment>`
  }
  get moduleType () {
    return proper((this.context && this.context.module) || 'home') + 'Module'
  }
}
/**
 * The Application class.
 */
export class Application {
  TEMPLATE () {
    return /* html */`<NewsModule ui:props="<- nav://context"/>`
  }
  TEMPLATE3 () {
    return /* html */`
      <Sidebar>
        <Aside ui:key="aside"/>
        <ModuleContainer ui:key="content" context="<- nav://context"/>
      </Sidebar>`
  }
  constructor () {
    Object.assign(this, {
      pipes,
      version

    })
    this.delegate = new Dispatcher(this)
  }
  // hook on init
  init () {
    const hashchange = () => this.emit('nav:hashchange', {value: window.location.hash.slice(1)})
    window.addEventListener('hashchange', hashchange)
    hashchange()
  }
  // emit actions from "-> url"
  emit (url, payload) {
    this.delegate.dispatch(url, payload)
  }
  // data access from "<- url"
  fetch (url, cb) {
    return this.delegate.subscribe(url, cb)
  }
  // resolves resources from ":key"
  resource (key, def) {
    return R[key] || def || (R[key] = humanize(key))
  }
}
