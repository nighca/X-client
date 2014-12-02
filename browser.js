/*
 * X in browser
 */

var shoe = require('shoe');
var X = require('./lib/X.js');
var util = require('./lib/util.js');

// record origin X
var originX = window.X;

// no conflict
X.noConflict = function(){
    window.X = originX;
    return X;
};

// realize _connect with shoe & use 'http' as default protocol
X._connect = function(url){
    url = util.defaultProtocol(url, 'http');
    return shoe(url);
};

// export X
window.X = module.exports = X;
