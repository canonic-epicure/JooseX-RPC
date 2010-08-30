Role('JooseX.RPC', {
    
    /*VERSION,*/
    
    use     : 'JooseX.RPC.Method',
    
    
    
    requires : 'getInvocationClass',
    
    has : {
        
        remoteMethodClass   : {
            is      : 'rw',
            
            init    : Joose.I.FutureClass('JooseX.RPC.Method')
        }
    },
    
        
    builder : {
        
        methods : {
            
            remote : function (meta, info) {
                var methods                 = meta.stem.properties.methods
                
                var invocationClass         = this.getInvocationClass()
                var remoteMethodClass       = this.getRemoteMethodClass()
                
                Joose.O.eachOwn(info, function (props, name) {
                    
                    props.meta              = remoteMethodClass
                    props.invocationClass   = invocationClass
                    
                    methods.addProperty(name, props)
                })
                
            }
        }
    }    

})
