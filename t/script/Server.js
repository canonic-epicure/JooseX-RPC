/**
 * Module dependencies.
 */

var sys     = require('sys')
var puts    = sys.puts


var express = require('express'),
    connect = require('connect');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    
//    app.use(connect.bodyDecoder());
    
    app.use(express.bodyDecoder())
    
    app.use(connect.methodOverride());
    app.use(connect.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router);
    app.use(connect.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(connect.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
   app.use(connect.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
    res.render('index.jade', {
        locals: {
            title: 'Express'
        }
    });
});


app.post('/some/url.json', function(req, res){
    
    var data = req.body
    
    
    res.send({
        
        result : data.params[0] + data.params[1]
    })
})


// Only listen on $ node app.js

if (!module.parent) app.listen(8080);
