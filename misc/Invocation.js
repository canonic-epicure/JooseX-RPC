Class('JooseX.RPC.Invocation', {
    
    trait   : 'JooseX.CPS',
    

    has : {
        
        source          : { required : true },
        args            : { required : true },
        
        method          : { required : true }
    },
    

    continued : {
        
        methods : {
            
            run : function () {
                throw "Abstract method 'run' called on [" + this + "]"
            }
        }
    }
})