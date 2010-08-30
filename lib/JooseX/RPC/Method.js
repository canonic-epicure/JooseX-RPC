Class('JooseX.RPC.Method', {
    
    meta : Joose.Meta.Class,
    
    isa : Joose.Managed.Property.MethodModifier.Override,
    
    
    use     : [
        'JSON2',
        
        Joose.is_NodeJS ? 'HTTP.Request.Provider.NodeJS' : 'HTTP.Request.Provider.XHR'
    ],
    
    
    trait   : 'JooseX.CPS',
    
    
    has : {
        config                  : null,
        invocationClass         : { required : true }
    },
    
    
    methods : {
    
        prepareWrapper : function (params) {
            
            if (params.isOwn) throw "Method [" + params.name + "] is applying over something [" + params.originalCall + "] in class [" + params.target + "]"
            
            var me          = this
            
            return function () {
                
                // return continuation, not immediate result
                return me.run.apply(me, arguments)
            }
        },
        
        
        // supposed to validate/munge arguments
        pre         : function () {
            return Array.prototype.slice.call(arguments)
        },
        
        
        // supposed to validate/munge results
        post        : function (response) {
            return response
        },
        
        
        createPacket : function (string) {
            return string
        },
        
        
        serialize   : function () {
        
        },
        
        
        deserialize   : function () {
        
        }
    },
    
    
    continued : {
        
        methods : {
            
            run : function () {
                var args        = this.pre.apply(this, arguments)
                
                var string      = this.serialize.apply(this, args)
                
                var packet      = this.createPacket(string)
                
                this.send(packet).andThen(function (responseString) {
                    
                    var response = this.deserialize(responseString)
                    
                    this.CONTINUE(this.post(response))
                })
            }
        }
    }
    
})
