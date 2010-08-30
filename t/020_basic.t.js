StartTest(function(t) {
    
    t.plan(3)
    
    
    var async0 = t.beginAsync()
    
    use('JooseX.RPC', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.RPC, "JooseX.RPC is here")
        t.ok(JooseX.RPC.Method, "JooseX.RPC.Method is here")
        

        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        
        Class('TestClass', {
            
            trait   : JooseX.RPC,
            
            
            methods : {
                
                check : function (p) {
                    return p > 0
                }
                
            },
            
            remote : {
                
                sum : {
                    
                    url     : '/8080/some/url.json',
                    verb    : 'POST',
                    
                    pre : function (p1, p2) {
                        if (arguments.length != 2) throw "Incorrect arguments"
                        
                        if (!this.check(p1)) throw "Incorrect arguments"
                    },
                    
                    
                    post : function (response) {
                        if (response.error) throw response.error
                        
                        return response.result
                    }
                },
                
                remoteMethod : {}
            }
        
        })
        
        var async1      = t.beginAsync()
        
        
        var instance = new TestClass()
        
        
        instance.sum(1, 10).andThen(function (res) {
            
            
            
            t.ok(res == 11, 'Correct result from remote method')
            
            t.endAsync(async1)
        })
        
        
        
        t.endAsync(async0)
    })
})    
