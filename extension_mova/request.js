function request(url, _opts) {

  var cb = function (r) {

    if (cb.resolver) {
      cb.resolver(r);
    } else {
      cb.result = r;
    }
  };

  var opts = _opts || {};

  var xhr = new XMLHttpRequest();
  xhr.open(opts.method || 'POST', url, true);

  // Send the proper header information along with the request
  xhr.setRequestHeader('Content-type', opts.contentType || 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var r = null;
      try {
        r = JSON.parse(xhr.responseText);
      } catch (e) {
        // no-op
      }
      cb((opts.adapter || ident)(r));
    }
  };

  xhr.send(opts.payload || null);

  return {
    then: function (_resolver) {
      if (cb.result) {
        _resolver(cb.result);
      } else {
        cb.resolver = _resolver;
      }
    }
  };
}

