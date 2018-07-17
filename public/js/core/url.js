// type:target/path?params#options
export function urlParse (s, r = {}) {
  if (!s) {
    return r
  }
  if (typeof s === 'object') {
    return s
  }
  let p
  // extract type:
  p = s.indexOf(':')
  if (p > -1) {
    r.type = s.slice(0, p)
    s = s.slice(p + 1)
  }
  // extract data:
  p = s.indexOf('#')
  if (p > -1) {
    r.options = decodeValue(s.slice(p + 1))
    s = s.slice(0, p)
  }
  // extract query params:
  p = s.indexOf('?')
  if (p > -1) {
    r.params = {}
    for (let param of s.slice(p + 1).split('&')) {
      let [key, value] = param.split('=')
      if (value) {
        r.params[ key ] = decodeValue(value)
      }
    }
    s = s.slice(0, p)
  }
  // target and path:
  let path = r.path = s.split('/').map(decodeURIComponent)
  while (path.length && !r.target) {
    r.target = path.shift()
  }
  return r
}

// represent as string
export function urlStringify (r) {
  let result = ''
  if (r.target) {
    if (r.type) {
      result += r.type + ':'
    }
    result += r.target
  }
  if (r.path) {
    result += '/' + r.path.map(encodeURIComponent).join('/')
  }
  const params = r.params
  if (params) {
    const keys = Object.keys(params).filter(key => (params[ key ] != null))
    if (keys.length) {
      result += '?' + keys.map(key => (key + '=' + encodeValue(params[ key ]))).join('&')
    }
  }
  if (r.options) {
    result += '#' + encodeValue(r.options)
  }
  return result
}

const VALUE_MAP = {
  true: true,
  false: false,
  undefined: Object.undefined
}

export function decodeValue (val) {
  const value = decodeURIComponent(val)
  if ('{['.indexOf(value[ 0 ]) > -1) {
    return JSON.parse(value)
  }
  const num = +value
  if (!isNaN(num)) {
    return num
  }
  return VALUE_MAP[ value ] || value
}
export function encodeValue (value) {
  return encodeURIComponent((typeof value === 'object') ? JSON.stringify(value) : `${value}`)
}
