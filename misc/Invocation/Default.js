Class('JooseX.RPC.Invocation.Default', {
    
    isa     : 'JooseX.RPC.Invocation',
    
    use     : [
        'JSON2',
        
        Joose.is_NodeJS ? 'HTTP.Request.Provider.NodeJS' : 'HTTP.Request.Provider.XHR'
    ],
    

    has : {
        
        config          : null,
        
        requestClass    : Joose.I.FutureClass(Joose.is_NodeJS ? 'HTTP.Request.Provider.NodeJS' : 'HTTP.Request.Provider.XHR')
    },
    
    
    after : {
        
        initialize : function () {
            this.config = this.method.config
        }
    },
    
        
    methods : {
        
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
            
            // supposed to send the parameters
            send    : function (string) {
                throw "Abstract method 'send' called on [" + this + "]"
            },
            
            
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