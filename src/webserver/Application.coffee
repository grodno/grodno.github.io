Object.entity.define
    id : 'webserver.Application' 
    properties : ['config', "plugins:Plugins"]
    methods : (_super) ->

        # Creates Entities from given DOM tree.
        init: ->
            @log "Application init"
            
            #@setupTerminationHandlers()
            
            @express = require("express")()
            @http = require("http").createServer(@express)            
 
            _super.init.call @

        onPluginsInitialized: ->
            @log 'onPluginsInitialized: '+@plugins.length

            p.config?(@) for p in @plugins

            #  Start the web http listening on the specific interface (and port).
            @http.listen @port, @ipaddress, =>
                @log "%s: Node server started on %s:%d ...", Date(Date.now()), @ipaddress, @port

            true

        # gets config param
        use: (x) ->
           @express.use(x)

        # gets config param
        config: (key, def) ->
            Object.get(@config, key) or def or null

               
        # done Application instance.
        # invoked from process.on('SIGTERM') hook
        done: (T) ->
            _super.done.call @, T
            @http.removeAllListeners "connection"
            @http.removeAllListeners "request"
            @http.close 
            @


        ###
        Setup termination handlers (for exit and a list of signals).
        ###
        setupTerminationHandlers: ->
            
            #  Process on exit and signals.
            process.on "exit", ->
                console.log "#{Date(Date.now())}: Node server stopped.", Date(Date.now())
    
            terminator = (sig) ->
                console.log "#{Date(Date.now())}: Received #{sig} - terminating ..."
                process.exit 1

            # Removed 'SIGPIPE' from the list - bugz 852598.
            (process.on -> self.terminator sig) for sig in ["SIGHUP","SIGINT","SIGQUIT","SIGILL","SIGTRAP","SIGABRT","SIGBUS","SIGFPE","SIGUSR1","SIGSEGV","SIGUSR2","SIGTERM"]
