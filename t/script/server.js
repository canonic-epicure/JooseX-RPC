/**
 * Module dependencies.
 */

var sys     = require('sys')
var puts    = sys.puts


var express = require('express')

    
var app = express.createServer()


// Configuration

app.configure(function(){
    
    app.use(express.bodyDecoder())
})


// Routes

app.get('/', function(req, res){
    res.render('index.jade', {
        locals: {
            title: 'Express'
        }
    });
});


app.put('/some/url.json', function(req, res){
    
    var data = req.body
    
    
    res.send({
        
        result : data.params[0] + data.params[1]
    })
})


app.post('/testclass/remotemethod', function(req, res){
    
    res.send({ foo : 'bar' })
})



// Only listen on $ node app.js

if (!module.parent) app.listen(8080);
