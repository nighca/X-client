/*
 * util methods
 */

var defaultProtocol = function(url, protocal){
	return /^\w+\:\/\//.test(url) ? url : (protocal + '://' + url);
};

module.exports = {
	defaultProtocol: defaultProtocol
};