X-client
=

Client part of [X](https://github.com/nighca/X), in Node.js & browser.

[X](https://github.com/nighca/X) is a universal model layer for browser apps based on websocket (realized with[dnode](https://github.com/substack/dnode) & [shoe](https://github.com/substack/shoe)).

### Install

#### in Node.js

	npm install x-client

```javascript
var X = require('x-client');
```

#### in browser

	bower install x-client

```html
<script type="text/javascript" src="../bower_components/x-client/dist/X.js"></script>
<script type="text/javascript">
	var X = window.X;
</script>
```

### Usage

```javascript

X
	.config({ token:'FAKETOKEN1QAZ2WSX3EDC' })
	.connect('server.address.with.x.service:port');

var TestModel = X.model('test');

TestModel.create({
	name: 'test1',
	cnt: {
		a: 1
	}
}, function(err, obj){
	// null, { ..., _id: '...' }
});

TestModel.list(function(err, res){
	// null, [{ ..., _id: '...' }]
});

TestModel.on('change', function(info){
    console.info('changed', info.type, info.data);
    // { type: 'create', data: [{ ..., _id: '...' }] }
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

	pass in config, token is required

* X.connect

	`[ 'server.address.with.x.service:port' ]` -> `X`

	connect to given server (should be a server with [X](https://github.com/nighca/X) service)

* X.ready

	`[ handler() ]` -> `X`

	handler will be executed while X service ready (executed immediately if already ready)

* X.model

	`[ 'name' ]` -> `model`

	define a model with name

* X.noConflict (only in browser)

	`[]` -> `X`

	relinquish control of the `X` variable.

#### model methods

see [here](https://github.com/nighca/X#model-methods)

### Test

#### in Node.js

	npm test

#### in browser

open `test/browser/index.html` in browser

### Build (dist file for browser)

	npm run build