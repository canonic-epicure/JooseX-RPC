Role('JooseX.RPC', {
    
    /*VERSION,*/
    
    use     : [
        'JooseX.RPC.Method'
    ],
    
    
    has : {
        remoteMethodClass   : Joose.I.FutureClass('JooseX.RPC.Method')
    },
    
        
    builder : {
        
        methods : {
            
            remote : function (meta, info) {
                var methods                 = meta.stem.properties.methods
                
                var remoteMethodClass       = this.remoteMethodClass
                
                Joose.O.eachOwn(info, function (props, name) {
                    
                    props.meta = props.meta || remoteMethodClass
                    
                    methods.addProperty(name, props)
                })
                
            }
        }
    }    

})
