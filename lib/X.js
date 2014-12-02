/*
 * X object
 */

var dnode = require('dnode')();
var config = require('./config');
var XModel = require('./XModel');

// pre-set methods (can be called before X's ready)
['list', 'get', 'distinct', 'create', 'remove', 'update', 'on'].forEach(function(name){
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
        XModel._extend(name, remote.model[name]);
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

    // the real connect method, realized differently in browser and Node.js
    _connect: null,

    // connect to given X-server
    connect: function(url){
        var stream = this._connect(url + '/X');
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

module.exports = X;