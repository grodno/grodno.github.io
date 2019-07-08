source ./const.sh
source ./utils.sh

function fetch() {
    printf "module.exports = " > meta.js
    curl -L $APP_META_URL >> meta.js
}

function mock() {
    printf "export default " > web/app/mock.js
    curl -L $APP_MOCK_URL >> web/app/mock.js
}

function dzi() {
    cp web/vendor/dzi/* ../ui-widgets/lib
    cp web/vendor/dzi/* ../dzi-todomvc/vendor/dzi
    cp web/vendor/dzi/* ../grodno/public/js/vendor/dzi
}

function make() {
    generate
}

function full() {
    touch meta.js
    generate
}

function generate() {
    full=$(find meta.js -newer version)
    if [ -n "$full" ]; then
        files=($(find -E _ -type f -regex ".*js$"))
        info "full make"
    else
        files=($(find -E _ -type f -regex ".*js$" -newer version))
    fi
    for item in ${files[*]}
    do
        file=$(echo $item | sed -E -e 's/_\/(.*)\.js/\1/g')
        gen $file
    done
    touch version
}

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

function install() {
    nvm i v10.1.0
    nvm use v10.1.0
    npm i
    npm i -g standard
    npm i -g http-server
}

function start() {
    info "start $APP_ID application in $APP_MODE mode"
    cd web
    npm run start
}

eval ${1:-start}