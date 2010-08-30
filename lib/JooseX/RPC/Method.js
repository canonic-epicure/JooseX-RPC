Class('JooseX.RPC.Method', {
    
    meta : Joose.Meta.Class,
    
    isa : Joose.Managed.Property.MethodModifier.Override,
    
    
    has : {
        invocationClass         : { required : true }
    },
    
    
    methods : {
    
        prepareWrapper : function (params) {
            
            if (params.isOwn) throw "Method [" + params.name + "] is applying over something [" + params.originalCall + "] in class [" + params.target + "]"
            
            var me          = this
            
            return function () {
                
                var invocation = new me.invocationClass({
                    source          : this,
                    
                    args            : arguments,
                    
                    method          : me
                })
                
                // return continuation, not immediate result
                return invocation.run.apply(invocation, arguments)
            }
        }
    }
})
