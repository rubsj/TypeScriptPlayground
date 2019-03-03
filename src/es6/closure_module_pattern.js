var Module = (function(){
    var privateProperty ='foo';
    function privateMethod(args){
        //do something
    }
    return {
        publicProperty:'',
        publicMethod: function(args){
            //do something
        },
        priviledgedMethod : function(args){
            return privateMethod(args);
        }
    };
})();