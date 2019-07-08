
const ENV = global.process.env
const APP = Object.keys(ENV).reduce((r,k)=>{if (k.slice(0,4)==='APP_') { r[k.slice(4)]=ENV[k]}; return r},{})

const devDependencies = {
  "babel-core": "^6.26.0",
  "babel-eslint": "^8.2.1",
  "babel-loader": "^7.1.4",
  "babel-preset-es2015": "^6.24.1",
  "babel-preset-es2016": "^6.24.1",
  "babel-preset-stage-3": "^6.24.1",
  "babel-register": "^6.26.0",
  "standard": "^10.0.3",
  "webpack": "^4.1.1"
}

const dependencies = {
  
}

const standard = {
  "parser": "babel-eslint",
  "ignore": [
    "**/out/",
    "/web/vendor/",
    "/node_modules/",
    "tmp.js"
  ]
}

console.log(JSON.stringify({
  "name": APP.ID,
  "version": APP.VERSION,
  "description": APP.DESCRIPTION,
  "repository": {
    "type": "git",
    "url": APP.REPO,
  },
  "author": APP.VENDOR,
  "license": APP.LICENSE,
  dependencies,
  devDependencies,
  scripts: {
    "start": "http-server",
    "build": "webpack-cli",
    "test": "http-server && chrome test.html"
  },
  standard
}, (k,v)=>v, 4))