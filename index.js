/*
 * X in Node.js
 */

var sockjsStream = require("sockjs-stream");
var X = require('./lib/X.js');
var util = require('./lib/util.js');

// realize _connect with sockjs-stream & use 'ws'(websocket) as default protocol
X._connect = function(url){
	url = util.defaultProtocol(url, 'ws');
	return sockjsStream(url);
};;

module.exports = X;