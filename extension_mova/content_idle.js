
function translit(s) {

  return normalize( cyrlat(s));
}

function perform() {

  window.translit = translit;
  var elements = document.getElementsByTagName('*');

  for (var i = 0; i < elements.length; i++) {
    var element = elements[ i ];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[ j ];

      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var replacedText = translit(text);

        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
  sanitize();
}

function sanitize() {

  var elements = [].concat.apply([], document.getElementsByTagName('script'));

  for (var i = 0; i < elements.length; i++) {
    var element = elements[ i ];

    element.remove();
  }

}

perform()