// Generated by CoffeeScript 1.7.1

/*
 Define the sample application.
 */

(function() {
  var SampleApp, express, fs;

  express = require("express");

  fs = require("fs");

  SampleApp = function() {
    var self;
    self = this;

    /*
    Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
      self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
      self.port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
      if (typeof self.ipaddress === "undefined") {
        console.warn("No OPENSHIFT_NODEJS_IP var, using 127.0.0.1");
        self.ipaddress = "127.0.0.1";
      }
    };

    /*
    Populate the cache.
     */
    self.populateCache = function() {
      if (typeof self.zcache === "undefined") {
        self.zcache = {
          "index.html": ""
        };
      }
      self.zcache["index.html"] = fs.readFileSync("./index.html");
    };

    /*
    Retrieve entry (content) from cache.
    @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) {
      return self.zcache[key];
    };

    /*
    terminator === the termination handler
    Terminate server on receipt of the specified signal.
    @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig) {
      if (typeof sig === "string") {
        console.log("%s: Received %s - terminating sample app ...", Date(Date.now()), sig);
        process.exit(1);
      }
      console.log("%s: Node server stopped.", Date(Date.now()));
    };

    /*
    Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function() {
      process.on("exit", function() {
        return self.terminator();
      });
      ["SIGHUP", "SIGINT", "SIGQUIT", "SIGILL", "SIGTRAP", "SIGABRT", "SIGBUS", "SIGFPE", "SIGUSR1", "SIGSEGV", "SIGUSR2", "SIGTERM"].forEach(function(element, index, array) {
        process.on(element, function() {
          self.terminator(element);
        });
      });
    };

    /*
    Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
      self.routes = {};
      self.routes["/asciimo"] = function(req, res) {
        var link;
        link = "http://i.imgur.com/kmbjB.png";
        res.send("<html><body><img src='" + link + "'></body></html>");
      };
      self.routes["/"] = function(req, res) {
        res.setHeader("Content-Type", "text/html");
        res.send(self.cache_get("index.html"));
      };
    };

    /*
    Initialize the server (express) and create the routes and register
    the handlers.
     */
    self.initializeServer = function() {
      var r;
      self.createRoutes();
      self.app = express();
      for (r in self.routes) {
        self.app.get(r, self.routes[r]);
      }
    };

    /*
    Initializes the sample application.
     */
    self.initialize = function() {
      self.setupVariables();
      self.populateCache();
      self.setupTerminationHandlers();
      self.initializeServer();
      return self;
    };

    /*
    Start the server (starts up the sample application).
     */
    self.start = function() {
      self.app.listen(self.port, self.ipaddress, function() {
        console.log("%s: Node server started on %s:%d ...", Date(Date.now()), self.ipaddress, self.port);
      });
      return self;
    };
  };

  module.exports = function() {
    return new SampleApp();
  };

}).call(this);