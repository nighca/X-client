/*
 * X Model
 */

var config = require('./config');

function XModel(name){
    this.name = name;
}

// extend X Model method
XModel._extend = function(name, method){
    this.prototype[name] = function(){
        var model = this,
            args = Array.prototype.slice.call(arguments);
        method.apply(model, [config.token, model.name].concat(args));
        return model;
    };
};

module.exports = XModel;