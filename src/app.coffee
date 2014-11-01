URI = Object.Uri.parse (''+@window?.location) or ""
DEBUG = Object.DEBUG = true or URI.params.debug #TODO

CONFIG =
        ID: "grodno.co"
        TITLE: "Grodno"
        VERSION: "1.5.2"
        COPYRIGHT: "2013, Grodno.Co"
        SOURCES: "0AqQx4KOOt8TGdEZWZHpBdXAtNlVSMUFMOXppQ3ZuMkE"
        GAT: "UA-37246628-1"
        GOOGLE_SHEETS_URI: "https://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc="
        GOOGLE_API_KEY: "AIzaSyAGenobWLKI-F6MWzrHIXmviwJww43n2EM" #'AIzaSyA--IJRFbmFubpjcz5Yherycv6Vy48qBY0'


Object.entity.create 
    id : 'app:webclient.Application' 
    title : CONFIG.TITLE
    plugins: [
            
            "remote:HttpService"
            
            "script:ScriptService"

            "settings:Settings"

            {
                id: "entity:EntityLoader"
            }
            {
                
                id:"html:HtmlLoader"
                storage: if Object.DEBUG then null else window.localStorage
            }
            {            
                id:"db:IndexedDatabase"
                #syncPeriod: 1 * 6 *1000
                syncUriExpression: "'script://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc=0AqQx4KOOt8TGdEZWZHpBdXAtNlVSMUFMOXppQ3ZuMkE&jsonp=callback&ts='+<@lastSynchedTimestampOnce>"#ByPeriod
                #socketChannel:'grodno.heroku.com'
                version: 5
                scheme: ['meta','links','enums','error']
            }
            {
                id:"gsheet:Cache"
                storage: window.localStorage
                uriPattern:'script://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc={{host}}&sheet={{path}}&jsonp=callback&version={{version}}'
            }
            {
                id:"blogger:Cache"
                storage: window.sessionStorage
                uriPattern:"script://www.googleapis.com/blogger/v3/blogs/{{host}}/posts?key=#{CONFIG.GOOGLE_API_KEY}&jsonp=callback&_ssl=true&version={{version}}"
                cacheSerializer:(data)->
                    if (s = data?.items) and s.length then JSON.stringify(s) else null
            }
            #{
               #
                #id:'lexio:lexiomated.TextFactory'
                #plugins: [
                        #'lexiomated.plugin.ParseHtml'
                        #'lexiomated.plugin.SplitText'
                        #'lexiomated.plugin.Numerics'
                        #'lexiomated.plugin.Hardcoded'
                        #'lexiomated.plugin.Morpheus'
                        #'lexiomated.plugin.WordScore'
                        #'lexiomated.plugin.Sentences'
                #]
            #}
        ]

doReload = ->
        ls = window.localStorage
        ls.removeItem(ls.key(i)) for o, i in ls
        ls

