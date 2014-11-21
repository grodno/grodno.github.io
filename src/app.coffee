Object.entity.create 
    id : 'app:webclient.Application' 
    title : Object.CONFIG.TITLE
    plugins: [
                id:"remote:HttpService"
            ,
                id:"script:ScriptService"
            ,
                id:"settings:Settings"
            ,
                id:'nav:webclient.HashNavigator'
            ,
                id: "entity:EntityService"
            ,
                id:"html:HtmlLoader"
                storage: if Object.DEBUG then null else window.localStorage
            ,
                id: "db:couch.CouchDb"
                remote: Object.CONFIG.COUCHDB
            ,
                #id:"idb:IndexedDatabase"
                #syncPeriod: 1 * 6 *1000
                #syncUriExpression: "'script://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc=0AqQx4KOOt8TGdEZWZHpBdXAtNlVSMUFMOXppQ3ZuMkE&jsonp=callback&ts='+<@lastSynchedTimestampOnce>"#ByPeriod
                #socketChannel:'grodno.heroku.com'
                #version: 5
                #scheme: ['meta','links','enums','error']
            #,
                id:"gsheet:Cache"
                storage: window.localStorage
                uriPattern:'script://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc={{host}}&sheet={{path}}&jsonp=callback&version={{version}}'
            ,
                id:"blogger:Cache"
                storage: window.sessionStorage
                uriPattern:"script://www.googleapis.com/blogger/v3/blogs/{{host}}/posts?key=#{Object.CONFIG.GOOGLE_API_KEY}&jsonp=callback&_ssl=true&version={{version}}"
                cacheSerializer:(data)->
                    if (s = data?.items) and s.length then JSON.stringify(s) else null
            ,
                id:'enum:EnumService'
                requires:['remote://*/js/enums.js']
            ,
                id:'l10n:L10nService'
                requires:['remote://*/js/l10n.js']
            ,
                id:'lexio:lexiomated.TextEngine'
                plugins:[
                    'lexiomated.plugin.Hardcoded'
                    'lexiomated.plugin.Morpheus'
                    'lexiomated.plugin.WordScore'
                    'lexiomated.plugin.Grodno'
                    'lexiomated.plugin.Sentences'
                ]
        ]

doReload = ->
        ls = window.localStorage
        ls.removeItem(ls.key(i)) for o, i in ls
        ls

