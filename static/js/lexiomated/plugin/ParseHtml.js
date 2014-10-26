(function() {
  Object.entity.define({
    id: "lexiomated.plugin.ParseHtml extends lexiomated.Plugin",
    methods: function(_super) {
      var TAGS_INFO, parseAttrs, reAttrs;
      TAGS_INFO = {
        'div': {
          isContainer: true
        },
        'span': {
          isContainer: true
        },
        'p': {
          isContainer: true
        },
        'a': {
          isContainer: true,
          nonRecursive: true
        },
        'ul': {
          isContainer: true,
          nonRecursive: true
        },
        'li': {
          isContainer: true,
          nonRecursive: true
        },
        "*": {
          isContainer: false
        }
      };
      reAttrs = /(\s+[a-z][a-z0-9\-]+)(?:=(\w+|['"]?[^>"]*['"]?))?/gi;
      parseAttrs = function(s) {
        var e, r, v;
        r = {};
        if (s) {
          while ((e = reAttrs.exec(s))) {
            v = e[2];
            r[e[1]] = v == null ? true : v[0] === '"' ? v.slice(1, -1) : v;
          }
        }
        return r;
      };
      return {
        handleEvent: function(event) {
          var re, root, stack;
          root = event.rootElt = new Lexion({
            kind: 'root',
            tag: 'article',
            text: event.input.trim().replace(/\n/g, '').replace(/\s+/g, ' ')
          });
          stack = [root];
          re = /<(\/?)([a-z]{1,7})((?:\s+[a-z][a-z0-9\-]+(?:=(?:\w+|"?[^>"]*"?))?)*)(\/?)>/gi;
          return root.executeRegExp(re, function(text, e) {
            var elt, opts, tag, tagInfo;
            if (e) {
              tag = e[2].toLowerCase();
              if (e[1] === '/') {
                if (tag === stack[0].tag && stack.length > 1) {
                  return stack.shift();
                }
              } else {
                opts = {
                  tag: tag,
                  attrs: parseAttrs(e[3]),
                  parent: stack[0]
                };
                if (e[4] === '/') {
                  return new Lexion(opts);
                } else {
                  elt = new Lexion(opts);
                  tagInfo = TAGS_INFO[tag] || TAGS_INFO['*'];
                  if (tagInfo.isContainer) {
                    elt.kind = 'box';
                    if (tagInfo.nonRecursive && stack[0].tag === tag) {
                      return stack[0] = elt;
                    } else {
                      return stack.unshift(elt);
                    }
                  }
                }
              }
            } else {
              if (text = text.trim()) {
                return new Lexion({
                  kind: 'text',
                  tag: 'span',
                  text: text,
                  parent: stack[0]
                });
              }
            }
          });
        }
      };
    }
  });

}).call(this);
