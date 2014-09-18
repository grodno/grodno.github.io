DEBUG = not ('local' in window.location.hostname)

APP = 
    id : 'app:ClientApplication' 
    title : "Langvar.JS"
    plugins: [
            
            "remote:HttpService"
            
            "script:ScriptService"

            {
                id: "entity:ScriptService"
                methods : (_super) ->
                    resolveUri: (uri) ->
                        uri.path = ('js/'+uri.domain.replace(/\./g,'/')+'.js').split('/')
                        uri.domain = "*"
                        _super.resolveUri.call @, uri
            }
            
            "settings:Settings"
            {
                
                id:"html:HtmlLoader"
                storage: if DEBUG then null else window.localStorage
            }
            {            
                id:"db:IndexedDatabase"

                #syncPeriod: 1 * 6 *1000
                syncUriExpression: "'script://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc=0AqQx4KOOt8TGdEZWZHpBdXAtNlVSMUFMOXppQ3ZuMkE&jsonp=callback&ts='+${?.lastSynchedTimestampOnce}"#ByPeriod
                #socketChannel:'grodno.heroku.com'
                version: 5
                scheme: ['meta','links','enums','error']
            }
            {
                id:"gsheet:Cache"
                storage: window.localStorage
                uriPattern:'script://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc={{domain}}&sheet={{path}}&jsonp=callback&version={{version}}'
            }
            {
               
                id:'lexio:lexio.TextFactory'
                plugins: [
                        'lexio.plugin.ParseHtml'
                        'lexio.plugin.SplitText'
                        'lexio.plugin.Numerics'
                        'lexio.plugin.Hardcoded'
                        'lexio.plugin.Morpheus'
                        'lexio.plugin.WordScore'
                        'lexio.plugin.Sentences'
                ]
            }
    ]

doReload = ->
        ls = window.localStorage
        ls.removeItem(ls.key(i)) for o, i in ls
        ls

