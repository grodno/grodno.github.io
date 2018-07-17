function translit(s) {

  return normalize(cyrlat(s));
}

var RE_TEST = /[а-яА-Я]/;

function removeElements(sel) {

  var elements = document.querySelectorAll(sel);
  for (var i = 0; i < elements.length; i++) {
    var element = elements[ i ];
    element.remove();
  }
}

function reduceAllTextNodes() {

  var elements = document.body.getElementsByTagName('*');
  var all = [];
  for (var i = 0; i < elements.length; i++) {
    var element = elements[ i ];
    var name = element.tagName;
    if (name === 'SCRIPT' || name === 'STYLE') {
      continue;
    }
    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[ j ];
      if (node.nodeType === 3) {
        var text = node.nodeValue.trim();
        if (text.length > 2 && text.match(RE_TEST)) {
          all.push(node);
          element.title = (element.title || '') + '\n' + text;
        }
      }
    }
  }
  return all;
}

function perform() {

  removeElements('footer');

  var nodes = reduceAllTextNodes();
  var payload = nodes.map(function (e) {
    return e.nodeValue;
  });

  var workerFactory = function (packet, offset) {
    return function () {
      API.translate(packet).then(
        function (result) {
          result.forEach(function (e, i) {
            var node = nodes[ offset + i ];
            var parent = node.parentElement;
            if (parent) {
              parent.replaceChild(document.createTextNode(translit(e)), node);
            }
          });
        }
      );
    };
  };

  for (var offset = 0, max = payload.length, num = 0; offset < max;) {
    for (var packet = [], len = 0, pos = offset; len < 1000 && pos < max; pos++) {
      var s = payload[ pos ];
      len += s.length;
      packet.push(s);
    }
    if (packet.length) {
      window.setTimeout(workerFactory(packet, offset), (num++) * 500);
    }
    offset = pos;
  }

}

window.setTimeout(perform, 500);