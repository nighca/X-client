X-client
=

Client/browser part of [X](https://github.com/nighca/X)

X is a universal model layer for browser apps based on [dnode](https://github.com/substack/dnode) & [shoe](https://github.com/substack/shoe).

### Usage

```javascript

// global variable - X
X
	// config (token, ...)
	.config({ token:'FAKETOKEN1QAZ2WSX3EDC' })

	// connect to server (X server)
	.connect('http://server.address.with.X.service:port')

	// connection ready (all model operation should be called after ready)
	.ready(function(){

	// define a model
	var TestModel = X.model('test', {
		name: 'String',
		cnt: 'Mixed'
	});

	// create a instance
	TestModel.create({
		name: 'test1',
		cnt: {
			a: 1
		}
	}, function(err, res){
		log('create', err, res);	// err, instance
	});

	// list all instances
	TestModel.list({
		// filters...
	}, function(err, res){
		log('list', err, res);		// err, list
	});

});

```
	

### API

#### X methods

* X.config

	`[ { token: ... } ]` -> `X`

	pass in config

* X.connect

	`[ 'http://server.address.with.X.service:port' ]` -> `X`

	connect to given server (should be a server with [X](https://github.com/nighca/X) service)

* X.ready

	`[ handler() ]` -> `X`

	handler will be executed while X service ready (executed immediately if already ready)

* X.model

	`[ { key: 'type', ... } ]` -> `model`

	define a model

	model struct described with key-[type](https://github.com/nighca/X/blob/master/db/types.js) pair

#### model methods

see [here](https://github.com/nighca/X)

### build

	browserify src/X.js -o dist/X.js