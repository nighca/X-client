X-client
=

client part (Javascript SDK) of [X](https://github.com/nighca/X)

### Usage

```javascript

// global variable - X
X
	// config (token, ...)
	.config({ token:'57d9620b7406041429ab3fa733fe9cca' })
	// connect to server (X server)
	.connect('http://cq01-rdqa-dev056.cq01.baidu.com:8083')
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

* X.connect

* X.ready

* X.model

#### model methods

see [here](https://github.com/nighca/X)

### build

	browserify src/X.js -o dist/X.js