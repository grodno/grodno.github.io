import { Application, ModuleContainer } from './app.js'
import { launch } from './vendor/dzi/index.js'
import components from './components/index.js'
import pages from './pages/index.js'

launch(Application, ModuleContainer, ...components, ...pages)

const hot = typeof module === 'undefined' ? null : module.hot
if (hot) {
  // hot.addStatusHandler(function (d) {})
  // launch(Application, ModuleContainer, ...components, ...pages)
  hot.accept()
}
