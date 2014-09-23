/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
exports.init = function (serv){  
    var express = require('express');
     
    var app = serv.app;
    
   // app.use(express.logger());
    app.use(express.compress());
    app.use(express.methodOverride());
    app.use(express['static']('static'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(Object.http.xmlPayloadParser());
    app.use(express.session({secret: 'keyboard cat'}));
    
    app.use(serv.createHandler());
    
    app.use(app.router);
  
}

