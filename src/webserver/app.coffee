###
 Define the sample application.
###
require('coffee-script/register');


express = require("express")
fs = require("fs")

SampleApp = ->
    
    #  Scope.
    self = this

    ###
    Set up server IP address and port # using env variables/defaults.
    ###
    self.setupVariables = ->
        
        #  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP
        self.port = process.env.OPENSHIFT_NODEJS_PORT or 8000
        if typeof self.ipaddress is "undefined"
            
            #  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            #  allows us to run/test the app locally.
            console.warn "No OPENSHIFT_NODEJS_IP var, using 127.0.0.1"
            self.ipaddress = "127.0.0.1"
        return

    
    ###
    Populate the cache.
    ###
    self.populateCache = ->
        self.zcache = "index.html": ""    if typeof self.zcache is "undefined"
        
        #  Local cache for static content.
        self.zcache["index.html"] = fs.readFileSync("./static/index.html")
        return

    
    ###
    Retrieve entry (content) from cache.
    @param {string} key  Key identifying content to retrieve from cache.
    ###
    self.cache_get = (key) ->
        self.zcache[key]

    
    ###
    terminator === the termination handler
    Terminate server on receipt of the specified signal.
    @param {string} sig  Signal to terminate on.
    ###
    self.terminator = (sig) ->
        if typeof sig is "string"
            console.log "%s: Received %s - terminating sample app ...", Date(Date.now()), sig
            process.exit 1
        console.log "%s: Node server stopped.", Date(Date.now())
        return

    ###
    Setup termination handlers (for exit and a list of signals).
    ###
    self.setupTerminationHandlers = ->
        
        #  Process on exit and signals.
        process.on "exit", ->
            self.terminator()

        # Removed 'SIGPIPE' from the list - bugz 852598.
        [
            "SIGHUP"
            "SIGINT"
            "SIGQUIT"
            "SIGILL"
            "SIGTRAP"
            "SIGABRT"
            "SIGBUS"
            "SIGFPE"
            "SIGUSR1"
            "SIGSEGV"
            "SIGUSR2"
            "SIGTERM"
        ].forEach (element, index, array) ->
            process.on element, ->
                self.terminator element
                return

            return

        return

    #  ================================================================  
    #  App server functions (main app logic here).                       
    #  ================================================================  
    
    ###
    Create the routing table entries + handlers for the application.
    ###
    self.createRoutes = ->
        self.routes = {}

        self.routes["/"] = (req, res) ->
            res.setHeader "Content-Type", "text/html"
            res.send fs.readFileSync("./static/index.html")#self.cache_get("index.html")
            return

        return

    ###
    Initialize the server (express) and create the routes and register
    the handlers.
    ###
    self.initializeServer = ->
        self.createRoutes()
        self.app = express()
        
        self.app.use(express.static('./static'))
        
        #  Add handlers for the app (from the routes).
        self.app.get r, self.routes[r] for r of self.routes
            
        return

    ###
    Initializes the sample application.
    ###
    self.initialize = ->
        self.setupVariables()
        self.populateCache()
        self.setupTerminationHandlers()
        
        # Create the express server and routes.
        self.initializeServer()
        self

    ###
    Start the server (starts up the sample application).
    ###
    self.start = ->
        
        #  Start the app on the specific interface (and port).
        self.app.listen self.port, self.ipaddress, ->
            console.log "%s: Node server started on %s:%d ...", Date(Date.now()), self.ipaddress, self.port
            return

        self

    return

module.exports = ->
	new SampleApp()
