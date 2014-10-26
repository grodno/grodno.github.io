(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Object.entity.define({
    id: 'webserver.FilesPlugin extends webserver.Plugin',
    staticDirs: ['./static'],
    permittedDirs: ['static'],
    methods: function(_super) {
      var express, fs, path;
      fs = require('fs');
      path = require('path');
      express = require('express');
      return {
        config: function(app) {
          var dir, _i, _len, _ref, _results;
          this.rootDir = path.dirname(require.main.filename);
          _ref = this.staticDirs;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            dir = _ref[_i];
            _results.push(app.use(express["static"](dir)));
          }
          return _results;
        },
        resolveUri: function(uri) {
          return path.resolve.apply(path, [this.rootDir].concat(uri.path));
        },
        checkPermission: function(uri) {
          var _ref;
          if (_ref = uri.path[0], __indexOf.call(this.permittedDirs, _ref) >= 0) {
            return null;
          } else {
            return this.error("forbidden: Not permitted: " + uri + " " + this.permittedDirs).log();
          }
        },
        getRaw: function(ev) {
          var err, name;
          name = this.resolveUri(ev.uri);
          if (err = this.checkPermission(ev.uri)) {
            return ev.callback(err);
          }
          return fs.exists(name, (function(_this) {
            return function(x) {
              if (!x) {
                return ev.callback(_this.error("not-found: File not found: " + ev.uri).log());
              }
              return fs.readFile(name, ev.callback);
            };
          })(this));
        },
        getUtf8: function(ev) {
          var err, name;
          name = this.resolveUri(ev.uri);
          if (err = this.checkPermission(ev.uri)) {
            return ev.callback(err);
          }
          return fs.exists(name, (function(_this) {
            return function(x) {
              if (!x) {
                return ev.callback(_this.error("not-found: File not found: " + ev.uri).log());
              }
              return fs.readFile(name, ev.uri.params.encoding || "utf8", ev.callback);
            };
          })(this));
        },
        getDir: function(ev) {
          var err, name;
          name = this.resolveUri(ev.uri);
          if (err = this.checkPermission(ev.uri)) {
            return ev.callback(err);
          }
          return fs.exists(name, (function(_this) {
            return function(x) {
              var f;
              if (!x) {
                return ev.callback(_this.error("not-found: Directory not found: " + ev.uri).log());
              }
              return ev.callback(null, (function() {
                var _i, _len, _ref, _results;
                _ref = fs.readdirSync(name);
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  f = _ref[_i];
                  _results.push({
                    id: ev.uri.path.concat(f).join('/'),
                    name: f
                  });
                }
                return _results;
              })());
            };
          })(this));
        }
      };
    }
  });

}).call(this);
