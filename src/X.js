var shoe = require('shoe');
var dnode = require('dnode')();

// store config
var config = {};

// class of X-model
function XModel(name, schema){
    this.name = name;
    this.schema = schema;
}

// extend X-model method
XModel.extend = function(name, method){
    this.prototype[name] = function(params, callback){
        var model = this;
        method(model.name, params, null, config.token, function(err, result){
            if(err === 'SCHEMA REQUIRED'){
                method(model.name, params, model.schema, config.token, callback);
            }else{
                callback(err, result);
            }
        });
    };
};

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
    model: function(name, schema){
        return new XModel(name, schema);
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
    }

};

// export X
window.X = X;