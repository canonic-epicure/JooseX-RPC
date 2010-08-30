Class('JooseX.RPC.Method', {
    
    meta : Joose.Meta.Class,
    
    isa : Joose.Managed.Property.MethodModifier.Override,
    
    
    use     : [
        'JSON2',
        
        Joose.is_NodeJS ? 'HTTP.Request.Provider.NodeJS' : 'HTTP.Request.Provider.XHR'
    ],
    
    
    trait   : 'JooseX.CPS',
    
    
    has : {
        prefix          : '',
        url             : null,
        verb            : 'POST',
        
        pre             : null,
        post            : null,
        
        requestClass    : Joose.I.FutureClass(Joose.is_NodeJS ? 'HTTP.Request.Provider.NodeJS' : 'HTTP.Request.Provider.XHR')
    },
    
    
    methods : {
    
        prepareWrapper : function (params) {
            
            if (params.isOwn) throw "Method [" + params.name + "] is applying over something [" + params.originalCall + "] in class [" + params.target + "]"
            
            var me          = this
            
            return function () {
                
                // return continuation, not immediate result
                return me.run({
                    
                    source  : this,
                    args    : Array.prototype.slice.call(arguments)
                })
            }
        },
        
        
        createPacket : function (source, args) {
            return {
                method  : source.meta.name + '/' + this.name,
                
                params  : args
            }
        },
        
        
        serialize   : function (packet) {
            return JSON2.stringify(packet)
        },
        
        
        deserialize   : function (string) {
            return JSON2.parse(string)
        }
    },
    
    
    continued : {
        
        methods : {
            
            send : function (url, verb, string) {
                var request = new this.requestClass({
                    method  : verb,
                    
                    data    : string,
                    
                    headers : {
                        'content-type' : 'application/json'
                    }
                })
                
                request.request(url).andThen(function (res) {
                    
                    this.CONTINUE(res.text)
                })
            },
            
            
            run : function (params) {
                var source      = params.source
                var args        = params.args
                
                var url         = this.url || this.prefix + (source.meta.name.replace(/\./g, '/') + '/' + this.name).toLowerCase()
                
                args            = this.pre && this.pre.apply(source, args) || args
                
                var packet      = this.createPacket(source, args)
                
                var string      = this.serialize(packet)
                
                this.send(url, this.verb, string).andThen(function (responseString) {
                    
                    var response    = this.deserialize(responseString)
                    
                    var res         = this.post && this.post.call(source, response) || response
                    
                    this.CONTINUE(res)
                })
            }
        }
    }
    
})
