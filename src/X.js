var shoe = require('shoe');
var dnode = require('dnode')();

// record origin X
var originX = window.X;

// store config
var config = {};

// class of X-model
function XModel(name){
    this.name = name;
}

// extend X-model method
XModel.extend = function(name, method){
    this.prototype[name] = function(){
        var model = this,
            args = Array.prototype.slice.call(arguments);
        method.apply(model, [config.token, model.name].concat(args));
        return model;
    };
};

// pre-set methods (can be called before X's ready)
['list', 'get', 'distinct', 'create', 'remove', 'update'].forEach(function(name){
    XModel.prototype[name] = function(){
        var model = this, args = arguments;
        X.ready(function(){
            model[name].apply(model, args);
        });
        return model;
    };
});

// record callbacks on X.ready
var readyQueue = [];

// listen to connection ready
dnode.on('remote', function(remote){
    // extend XModel with remote methods
    Object.keys(remote.model).forEach(function(name){
        XModel.extend(name, remote.model[name]);
    });

    // trigger ready
    X.isReady = true;
    readyQueue.forEach(function(handler){
        handler();
    });
});

// exposed methods
var X = {

    // always not ready while initializing
    isReady: false,

    // do config
    config: function(cfg){
        Object.keys(cfg).forEach(function(key){
            config[key] = cfg[key];
        });

        return this;
    },

    // create a X-model
    model: function(name){
        return new XModel(name);
    },

    // connect to given X-server
    connect: function(url){
        var stream = shoe(url + '/X');
        dnode.pipe(stream).pipe(dnode);

        return this;
    },

    // execute hander after X's ready
    ready: function(cb){
        if(this.isReady) cb();
        else readyQueue.push(cb);

        return this;
    },

    noConflict: function(){
        window.X = originX;
        return X;
    }

};

// export X
window.X = X;