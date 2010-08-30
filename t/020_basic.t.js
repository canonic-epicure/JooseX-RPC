StartTest(function(t) {
    
    t.plan(4)
    
    
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
                    verb    : 'PUT',
                    
                    pre : function (p1, p2) {
                        if (arguments.length != 2) throw "Incorrect arguments"
                        
                        if (!this.check(p1)) throw "Incorrect arguments"
                    },
                    
                    
                    post : function (response) {
                        if (response.error) throw response.error
                        
                        return response.result
                    }
                },
                
                remoteMethod : {
                    prefix : '/8080/'
                }
            }
        
        })
        
        var instance = new TestClass()
        
        
        
        var async1      = t.beginAsync()
        
        instance.sum(1, 10).andThen(function (res) {
            
            t.ok(res == 11, 'Correct result from remote method #1')
            
            t.endAsync(async1)
        })
        
        
        var async2      = t.beginAsync()
        
        instance.remoteMethod().andThen(function (res) {
            
            t.ok(res.foo == 'bar', 'Correct result from remote method #2')
            
            t.endAsync(async2)
        })
        
        
        
        
        t.endAsync(async0)
    })
})    
