var shoe = require('shoe');
var d = require('dnode')();

var config = {};

var remoteMethods = {
    model: {},
    instance: {}
};

var wrapModelMethod = function(method){
    return function(params, callback){
        var model = this;
        method(model._name, params, null, config.token, function(err, result){
            if(err === 'SCHEMA REQUIRED'){
                method(model._name, params, model.schema, config.token, callback);
            }else{
                callback(err, result);
            }
        });
    };
};

var wrapInstanceMethod = function(method){};

var createModel = function(name, schema){
    function CustomModel(){}

    CustomModel._name = name;
    CustomModel.schema = schema;

    Object.keys(remoteMethods.model).forEach(function(name){
        CustomModel[name] = remoteMethods.model[name];
    });

    Object.keys(remoteMethods.instance).forEach(function(name){
        CustomModel.prototype[name] = remoteMethods.instance[name];
    });

    return CustomModel;
};

var X = {
    config: function(cfg){
        config = cfg;
        return this;
    },
    model: createModel,
    connect: function(url){
        var stream = shoe(url + '/X');
        d.pipe(stream).pipe(d);
        return this;
    },
    readyQueue: [],
    ready: function(cb){
        if(this.isReady){
            cb();
        }else{
            this.readyQueue.push(cb);
        }
        return this;
    },
    init: function(remote){
        Object.keys(remote.model).forEach(function(name){
            remoteMethods.model[name] = wrapModelMethod(remote.model[name]);
        });

        Object.keys(remote.instance).forEach(function(name){
            remoteMethods.instance[name] = wrapInstanceMethod(remote.instance[name]);
        });

        this.isReady = true;

        this.readyQueue.forEach(function(handler){
            handler();
        });
    }
};

d.on('remote', function(remote){
    X.init(remote);
});

window.X = X;