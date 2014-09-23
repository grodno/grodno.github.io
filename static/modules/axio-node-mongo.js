
// mongo connector
var mongo;

// database instance
var db;

// ObjectID factory
var ObjectID = function(id) {
    return id ? new mongo.BSONPure.ObjectID(id) : null;
}

// `init` module
exports.init = function(server, cfg) {
    var _opInit = [
                function(ev) { 
                    this.event = ev;
                    //Object.debug("DB"+ev.uri);
                    // collection 
                    this.collection = ev.collection || ev.uri.path[0];
                    // query
                    this.query = ev.query || Object.parse(ev.uri.params.query) || ObjectID(ev.uri.params.docId || ev.uri.hash) || {};
                    // payload
                    this.payload = ev.payload || ev.doc || ev.docs
                    // options have most priority
                    this.options = Object.clone(ev.uri.params, ev.options);
                
                    if (!db) {
                        Object.debug('mongo db: ',cfg.url);
                        (mongo || (mongo = require("mongodb"))).connect(cfg.url, cfg.options, this)
                    } else {
                        this( null, db);
                    }
                }
                ,
                function(err, _db) {
                    //            console.log('mongo db opened: ', err, this.coll);
                    if (this.ok(err)) {
                        db = _db;
                        // go with collection
                        db.collection(this.collection, this);
                    }
                }
                ];
                
    var _opDone = function(err, result) { 
                    if (err){
                        // reset database
                        exports.done();
                    }
                    this.event.callback(err, result);
                };
    Object.entity.create({
        id:'EventHandler:db', 
        handleEventImpl:function(ev){
            Function.perform(_opInit.concat(OPERATIONS[ev.uri.host], _opDone), ev);
        }
    })
};

// `done` module
exports.done = function() {
    db && db.close(); 
    db = null;
};

//Query  app.get('/mongo/:collection/:id', 
var _cursor = (function() {
    var optionsKeys = ['limit','sort','fields','skip','hint','explain','snapshot','timeout'];

    var queryOptionsFilter =  function(params) { 
        var r = {};
        for (var v in params) {
            if( optionsKeys.indexOf(v) > -1 ) {
                r[v] = params[v];
            }
        }
        r.sort = (typeof(r.sort)==='string') ? Object.parse(r.sort) : r.sort;
        r.fields = (typeof(r.fields)==='string') ? Object.parse(r.fields) : r.fields;
        r.limit = Number(r.limit)||100;
        r.skip = Number(r.skip)||0;
        return r;
    };

    return [
    function(err, collection) { 
        if (this.ok(err)) {
            collection.find(this.query, queryOptionsFilter(this.options), this);
        }
    }
    ];
})();

var _query, _findOne, _retPayload = function(err) {
    Object.debug('mongo updated docs: '+this.event.uri, err, this.payload)
    this(err, err ?  null : this.payload);
};

var OPERATIONS = {
    // query items
    query : _query = _cursor.concat(
        function(err, cursor) { 
            if (this.ok(err)) {
                cursor.toArray(this);
            }
        },
        function(err, docs) {
            Object.debug('mongo query docs: '+this.event.uri, err, docs && docs.length);
            this(err, docs);
        })
    ,
    // count items
    count  : _cursor.concat(
        function(err, cursor) { 
            if (this.ok(err)) {
                cursor.count(this);
            }
        })
    ,
    // finds first one
    findOne : _findOne =  _query.concat(
        function(err, docs) { 
            Object.debug('findOne', docs, this.event);
            docs = Array.item(docs);
            this(err, docs);
        })
    ,
    // insert new items
    insert : [function(err, collection) {
        if (this.ok(err)) {
            collection.insert(this.payload, this.options, this); 
        }
    },_retPayload]
    ,
    //Update items by query
    update : [function(err, collection) {
        collection ? collection.update(this.query, this.payload, this.options,  this): this(err);
    }    
    ,_retPayload
    ]
    ,
    //Update items by query
    upsert : [function(err, collection) {
        this.options.upsert=true;
        collection ? collection.update(this.query, this.payload, this.options,  this): this(err);
    }    
    ,_retPayload
    ]
    ,
    // Delete item by query 
    remove : function(err, collection) {
        collection ? collection.remove(this.query, this): this(err);
    }

};