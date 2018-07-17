
function install() {
    nvm i v10.1.0
    nvm use v10.1.0
    npm i
    npm i -g standard
    npm i -g http-server
}

function start() {
    cd web
    http-server
}

eval ${1:-start}