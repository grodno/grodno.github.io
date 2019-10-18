const ENV = global.process.env
const APP = Object.keys(ENV).reduce((r,k)=>{if (k.slice(0,4)==='APP_') { r[k.slice(4)]=ENV[k]}; return r},{})
console.log(`
# ${APP.ID} • ${APP.VERSION}

  ${APP.DESCRIPTION}

  [Functional specification](${APP.SPEC_URL})

## Install

    git clone ${APP.REPO}
    cd ${APP.ID}
    ./make.sh
    ./start.sh

## Attribution

  ${APP.LICENSE} - [${APP.VENDOR}](${APP.VENDOR_URL})
`.trim())