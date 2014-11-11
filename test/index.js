X
    .config({ token:'57d9620b7406041429ab3fa733fe9cca' })
    .connect('http://127.0.0.1:8083');

var TestModel = X.model('test');

var promise = function(handler){
    return new Promise(handler);
};

var log = console.log.bind(console, '*');

promise(function(resolve, reject){

    resolve('start');

}).then(function(){

    return promise(function(resolve, reject){
        TestModel.create([
            {
                name: 'test1',
                num: 1
            },
            {
                name: 'test1',
                num: 1
            },
            {
                name: 'test2',
                num: 2
            }
        ], function(err, res1, res2, res3){
            log('create', err, res1, res2, res3);

            if(err) reject(err);
            else resolve(res1, res2, res3);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        TestModel.list(function(err, res){
            log('list', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        TestModel.list({}, 'name', function(err, res){
            log('list name', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        TestModel.distinct('name', function(err, res){
            log('distinct name, all', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        TestModel.distinct('num', {
            name: 'test1'
        }, function(err, res){
            log('distinct num, test1', err, res);

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
            name: 'test1'
        }, {
            num: 2
        }, function(err, res){
            log('update', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        TestModel.list(function(err, res){
            log('list', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        TestModel.remove({
        }, function(err, res){
            log('remove', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        TestModel.list(function(err, res){
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
