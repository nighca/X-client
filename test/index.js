X
    .config({ token:'57d9620b7406041429ab3fa733fe9cca' })
    .connect('http://127.0.0.1:8083')
    .ready(function(){

    var TestModel = X.model('test', {
        name: 'String',
        cnt: 'Mixed'
    });

    var promise = function(handler){
        return new Promise(handler);
    };

    var log = console.log.bind(console, '*');

    promise(function(resolve, reject){

        resolve('start');

    }).then(function(){

        return promise(function(resolve, reject){
            TestModel.create({
                name: 'test1',
                cnt: {
                    a: 1
                }
            }, function(err, res){
                log('create', err, res);

                if(err) reject(err);
                else resolve(res);
            });
        })

    }).then(function(){

        return promise(function(resolve, reject){
            TestModel.list({
            }, function(err, res){
                log('list', err, res);

                if(err) reject(err);
                else resolve(res);
            });
        })

    }).then(function(){

        return promise(function(resolve, reject){
            TestModel.get({
                name: 'test1'
            }, function(err, res){
                log('get', err, res);

                if(err) reject(err);
                else resolve(res);
            });
        })

    }).then(function(){

        return promise(function(resolve, reject){
            TestModel.update({
                filters: {
                    name: 'test1'
                },
                updates: {
                    cnt: {
                        a: 1,
                        b: 2
                    }
                }
            }, function(err, res){
                log('update', err, res);

                if(err) reject(err);
                else resolve(res);
            });
        })

    }).then(function(){

        return promise(function(resolve, reject){
            TestModel.get({
                name: 'test1'
            }, function(err, res){
                log('get', err, res);

                if(err) reject(err);
                else resolve(res);
            });
        })

    }).then(function(){

        return promise(function(resolve, reject){
            TestModel.remove({
                name: 'test1'
            }, function(err, res){
                log('remove', err, res);

                if(err) reject(err);
                else resolve(res);
            });
        })

    }).then(function(){

        return promise(function(resolve, reject){
            TestModel.list({
            }, function(err, res){
                log('list', err, res);

                if(err) reject(err);
                else resolve(res);
            });
        })

    }).done(function(res){
        log('finished.');
    }, function(err){
        log('failed,', err);
    })


});