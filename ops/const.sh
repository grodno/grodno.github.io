export APP_META_URL="https://script.google.com/macros/s/AKfycbylUOAnlLNwvmFUdkF_dRCLOcVk1fJzBjWxMtzQFct28NMCSSRk/exec"
export APP_MOCK_URL="https://script.google.com/macros/s/AKfycbxyaXtVN0OObM1h3o-tLdTAE0nx-xTBkNLy2Ypc_eis2VqH5NM/exec"
export APP_REPO=$(git config --get remote.origin.url)
export APP_BASE_DIR=${DIR_BASE:-$PWD}
export APP_LOGS_DIR=${DIR_BASE}/log
export APP_IP=192.168.99.1
export APP_HOST=local.andromeda.xyz
export APP_MODE=${MODE:-'dev'}
