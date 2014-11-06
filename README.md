X-client
=

Client/browser part of [X](https://github.com/nighca/X)

X is a universal model layer for browser apps based on [dnode](https://github.com/substack/dnode) & [shoe](https://github.com/substack/shoe).

### Usage

```html
<script type="text/javascript" src="../dep/x-client/dist/X.js"></script>
```

```javascript

// global variable - X
X
	// config (token, ...)
	.config({ token:'FAKETOKEN1QAZ2WSX3EDC' })

	// connect to server (X server)
	.connect('http://server.address.with.X.service:port');

// define a model
var TestModel = X.model('test');

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

```
	

### API

#### X properties

* X.isReady

	`true` / `false`

	if X connection is ready

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

	`[ 'name' ]` -> `model`

	define a model with name

* X.noConflict

	`[]` -> `X`

	relinquish control of the `X` variable.

#### model methods

see [here](https://github.com/nighca/X#model-methods)

### build

	browserify src/X.js -o dist/X.js