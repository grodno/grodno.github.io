(function() {
  Object.entity.define({
    id: "couch.CouchDb",
    properties: ['touch:Number', "sync", 'ddoc'],
    remote: 'http://127.0.0.1:5984/default',
    ddoc: {
      "_id": "_design/common",
      "language": "javascript",
      "views": {
        "kind": {
          "map": "function(doc) { \n\tif (!doc.disabled){\n\t\tvalue = {id:doc._id, kind: doc.kind, name: doc.name, logo:doc.logo}\n\t\temit([doc.kind, doc._id], value) \n\t}\n}"
        },
        "tree": {
          "map": "function(doc) { \n\tif (!doc.disabled){\n\t\tvalue = {id:doc._id, kind: doc.kind, name: doc.name, logo:doc.logo}\n\t\temit([doc._id, null], value) \n\t\tif (doc.parent) { \n\t\t\temit([doc.parent, doc.ts || 1], value) \n\t\t}\n\t}\n}"
        }
      }
    },
    methods: function(_super) {
      var _qEq1;
      _qEq1 = function(key) {
        return "startkey=[\"" + key + "\",null]&endkey=[\"" + key + "\",\"\ufff0\"]";
      };
      return {
        launch: function(cb) {
          _super.launch.call(this, cb);
          return Object.entity.create({
            id: "remote" + this.id + ":couch.CouchDbHttp",
            remote: this.remote
          }, (function(_this) {
            return function(err, obj) {
              _this.remoteService = obj;
              return _this.checkIfDbExists();
            };
          })(this));
        },
        done: function() {
          var _ref;
          if ((_ref = this.remoteService) != null) {
            _ref.done();
          }
          return _super.done.call(this);
        },
        onEvent: function(ev, u) {
          if (u == null) {
            u = ev.uri;
          }
          return this[u.host](ev, u, u.path[0]);
        },
        doc: function(ev, u, docId) {
          ev.uri = "remote" + this.id + "://*/" + docId;
          return Object.event.fire(ev);
        },
        put: function(ev, u, docId) {
          if (!ev.doc) {
            if (typeof ev.callback === "function") {
              ev.callback(Object.error('empty: No doc to put into db').log());
            }
          }
          if (docId) {
            ev.doc._id = docId;
          }
          if (!ev.doc._id) {
            ev.doc._id = Object.math.uuid();
          }
          Object.update(ev, {
            uri: "remote" + this.id + "://*/" + ev.doc._id,
            method: 'put',
            payload: ev.doc
          });
          return Object.event.fire(ev, (function(_this) {
            return function(err, result) {
              if (!err) {
                _this.prop("" + ev.doc.kind + "Touch", _this.incrementTouch());
              }
              return typeof ev.callback === "function" ? ev.callback(err, result) : void 0;
            };
          })(this));
        },
        bulk: function(ev, u, newEdits) {
          if (newEdits == null) {
            newEdits = false;
          }
          if (newEdits) {
            ev.newEdits = newEdits;
          }
          Object.update(ev, {
            uri: "remote" + this.id + "://*?new_edits=" + ev.newEdits,
            method: 'post',
            payload: ev.docs
          });
          return Object.event.fire(ev, ev.callback);
        },
        all: function(ev, u, kind) {
          ev.uri = "" + (this._viewBase()) + "kind?include_docs=true&" + (_qEq1(kind));
          return Object.event.fire(ev, function(err, out) {
            var data, e;
            data = (out != null ? out.rows : void 0) && ((function() {
              var _i, _len, _ref, _results;
              _ref = out.rows;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                e = _ref[_i];
                _results.push(e.doc);
              }
              return _results;
            })()) || [];
            return ev.callback(err, data);
          });
        },
        kind: function(ev, u, kind) {
          ev.uri = "" + (this._viewBase()) + "kind?" + (_qEq1(kind));
          return Object.event.fire(ev, function(err, out) {
            var data, e;
            data = (out != null ? out.rows : void 0) && ((function() {
              var _i, _len, _ref, _results;
              _ref = out.rows;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                e = _ref[_i];
                _results.push(e.value);
              }
              return _results;
            })()) || [];
            return ev.callback(err, data);
          });
        },
        _viewBase: function(ddoc) {
          if (ddoc == null) {
            ddoc = 'common';
          }
          return "remote" + this.id + "://*/_design/" + ddoc + "/_view/";
        },
        tree: function(ev, u, parentId) {
          var kind;
          kind = u.path[1];
          ev.uri = "" + (this._viewBase()) + "tree?" + (_qEq1(parentId));
          return Object.event.fire(ev, function(err, out) {
            var data, e, parent, r, v, _i, _len, _ref;
            r = [];
            _ref = data = (out != null ? out.rows : void 0) || [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              e = _ref[_i];
              if (v = e.value) {
                if (e.key[1] === null) {
                  parent = v;
                } else {
                  if (!kind || (v.kind === kind)) {
                    v.parentObj = parent;
                    r.push(v);
                  }
                }
              }
            }
            return ev.callback(err, r);
          });
        },
        view: function(ev, u, ddoc) {
          if (u.params.key) {
            u.params.startkey = u.params.startkey + '/';
            u.params.endkey = u.params.endkey + '0';
          }
          ev.uri = Object.Uri.parse("" + (this._viewBase(ddoc)) + u.path[1] + "?startkey=\"" + u.params.startkey + "\"&endkey=\"" + u.params.endkey + "\"");
          return Object.event.fire(ev, function(err, out) {
            var data, e;
            data = (out != null ? out.rows : void 0) && ((function() {
              var _i, _len, _ref, _results;
              _ref = out.rows;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                e = _ref[_i];
                _results.push(e.value);
              }
              return _results;
            })()) || [];
            return ev.callback(err, data);
          });
        },
        initContent: function(cb) {
          return Object.event.fire({
            uri: "remote" + this.id + "://*/" + this.ddoc._id,
            method: 'put',
            payload: this.ddoc
          });
        },
        checkIfDbExists: function() {
          return Function.perform(this, function(flow) {
            var ops;
            return ops = [
              function() {
                return Object.event.fire({
                  uri: "remote" + this.id + "://*/_design/common",
                  callback: flow.next
                });
              }, function(err, r) {
                if (err) {
                  return Object.event.fire({
                    uri: "remote" + this.id + "://*/",
                    method: 'put',
                    callback: (function(_this) {
                      return function() {
                        return _this.initContent(flow.next);
                      };
                    })(this)
                  });
                } else {
                  return flow.next();
                }
              }
            ];
          });
        }
      };
    }
  });

}).call(this);
