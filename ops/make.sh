source ./const.sh

function fetch() {
    printf "module.exports = " > meta.js
    curl -L $APP_META_URL >> meta.js
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
    info "start $APP_ID application in $APP_MODE mode"
    cd web
    npm run start
}

eval ${1:-start}