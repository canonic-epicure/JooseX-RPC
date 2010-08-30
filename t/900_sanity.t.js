Role('MyApp.RPC', {
    
    use     : [ 'JooseX.RPC', 'JooseX.RPC.Invocation.JSONRPC' ],
    
    
body : function () {
    
    this.meta.extend({
        
        does : JooseX.RPC({
            
            invocationClass : JooseX.RPC.Invocation.JSONRPC
            
        })
    })
    
}})



Role('MyApp.RPC', {
    
    use     : [ 'JooseX.RPC.Invocation.JSONRPC' ],
    
    
    does    : 'JooseX.RPC',
    
    
    has     : {
        
        invocationClass : {
            is      : 'rw',
            
            init    : Joose.I.FutureClass('JooseX.RPC.Method.JSONRPC')
        }
    }
    

})



Class('Some.Class', {

    trait : 'MyApp.RPC', 
    
    has : {
        attr : null
    },
    
    
    methods : {
        localMethod : function () {}
    },
    
    
    
    remote : {
    
        remoteMethod : {
            
            meta            : JooseX.Method.JSON-RPC,
        
            url             : '/some/class/remotemethod', // default
            verb            : 'POST', // default
            
            pre             : function (p1, p2) {
                if (arguments.length != 2) throw "Need 2 arguments"
                
                if (p2 < p1) throw "2nd arg gotta to be greater than 1st"
                    
                return arguments
            },
        
            serializer      : KiokuJS.encode,  // or function (args) { return string}
            deserializer    : KiokuJS.decode,  // or function (string) { return [ result ] }
            
            send            : function () {}
        }
    }

})


var obj = new Some.Class()


obj.remoteMethod(1, 10).andThen(function (result) {

    // result
    
}).except(function (error) {

    // exceptions
})