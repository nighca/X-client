var assert = chai.assert;

var TestModel,
    lastChangeInfo;

describe('config', function(){
    it('should accept config with token', function(){
        assert(X === X.config({ token:'57d9620b7406041429ab3fa733fe9cca' }));
    });
});

describe('connect', function(){
    it('should accept an address', function(){
        assert(X === X.connect('127.0.0.1:8083'));
    });
});

describe('model', function(){
    it('should create a model with methods', function(){
        TestModel = X.model('test');
        assert.strictEqual('function', typeof TestModel.list);
        assert.strictEqual('function', typeof TestModel.get);
        assert.strictEqual('function', typeof TestModel.distinct);
        assert.strictEqual('function', typeof TestModel.create);
        assert.strictEqual('function', typeof TestModel.remove);
        assert.strictEqual('function', typeof TestModel.update);
        assert.strictEqual('function', typeof TestModel.on);
    });
});

describe('change', function(){
    it('listens to model change', function(){
        TestModel.on('change', function(info){
            lastChangeInfo = info;
        });
    });
});

describe('create', function(){
    it('should create successfully', function(done){
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
            assert.strictEqual(null, err);
            assert.deepEqual({ name: 'test1', num: 1 , _id: res1._id}, res1);
            assert.deepEqual({ name: 'test1', num: 1 , _id: res2._id}, res2);
            assert.deepEqual({ name: 'test2', num: 2 , _id: res3._id}, res3);

            assert.strictEqual('create', lastChangeInfo.type);
            var lastChangeData = lastChangeInfo.data;
            assert.deepEqual({ name: 'test1', num: 1 , _id: lastChangeData[0]._id}, lastChangeData[0]);
            assert.deepEqual({ name: 'test1', num: 1 , _id: lastChangeData[1]._id}, lastChangeData[1]);
            assert.deepEqual({ name: 'test2', num: 2 , _id: lastChangeData[2]._id}, lastChangeData[2]);
            done();
        });
    });
});

describe('list', function(){
    it('should list all', function(done){
        TestModel.list(function(err, res){
            assert.strictEqual(null, err);
            assert.strictEqual(3, res.length);
            assert.deepEqual({ name: 'test1', num: 1 , _id: res[0]._id}, res[0]);
            assert.deepEqual({ name: 'test1', num: 1 , _id: res[1]._id}, res[1]);
            assert.deepEqual({ name: 'test2', num: 2 , _id: res[2]._id}, res[2]);
            done();
        });
    });

    it('should list name', function(done){
        TestModel.list({}, 'name', function(err, res){
            assert.strictEqual(null, err);
            assert.strictEqual(3, res.length);
            assert.deepEqual({ name: 'test1', _id: res[0]._id}, res[0]);
            assert.deepEqual({ name: 'test1', _id: res[1]._id}, res[1]);
            assert.deepEqual({ name: 'test2', _id: res[2]._id}, res[2]);
            done();
        });
    });
});

describe('distinct', function(){
    it('should distinct all by name', function(done){
        TestModel.distinct('name', function(err, res){
            assert.strictEqual(null, err);
            assert.strictEqual(2, res.length);
            assert.strictEqual('test1', res[0]);
            assert.strictEqual('test2', res[1]);
            done();
        });
    });

    it('should distinct test1 by num', function(done){
        TestModel.distinct('num', {
            name: 'test1'
        }, function(err, res){
            assert.strictEqual(null, err);
            assert.strictEqual(1, res.length);
            assert.strictEqual(1, res[0]);
            done();
        });
    });
});

describe('get', function(){
    var id;

    it('should get test1 by name', function(done){
        TestModel.get({
            name: 'test1'
        }, function(err, res){
            assert.strictEqual(null, err);
            assert.deepEqual({ name: 'test1', num: 1 , _id: res._id}, res);

            id = res._id;
            done();
        });
    });

    it('should get test1 by id', function(done){
        TestModel.get({
            _id: id
        }, function(err, res){
            assert.strictEqual(null, err);
            assert.deepEqual({ name: 'test1', num: 1 , _id: id}, res);
            done();
        });
    });
});

describe('update', function(){
    it('should update test1 to num=2', function(done){
        TestModel.update({
            name: 'test1'
        }, {
            num: 2
        }, function(err, res){
            assert.strictEqual(null, err);
            assert.strictEqual(2, res);

            assert.strictEqual('update', lastChangeInfo.type);
            var lastChangeData = lastChangeInfo.data;
            assert.strictEqual(2, lastChangeData[0]);
            done();
        });
    });

    it('should list all items(updated)', function(done){
        TestModel.list(function(err, res){
            assert.strictEqual(null, err);
            assert.strictEqual(3, res.length);
            assert.deepEqual({ name: 'test1', num: 2 , _id: res[0]._id}, res[0]);
            assert.deepEqual({ name: 'test1', num: 2 , _id: res[1]._id}, res[1]);
            assert.deepEqual({ name: 'test2', num: 2 , _id: res[2]._id}, res[2]);
            done();
        });
    });
});

describe('remove', function(){
    it('should remove all', function(done){
        TestModel.remove({
        }, function(err, res){
            assert.strictEqual(null, err);
            assert.strictEqual(3, res);

            assert.strictEqual('remove', lastChangeInfo.type);
            var lastChangeData = lastChangeInfo.data;
            assert.strictEqual(3, lastChangeData[0]);
            done();
        });
    });

    it('should list all items(empty)', function(done){
        TestModel.list(function(err, res){
            assert.strictEqual(null, err);
            assert.strictEqual(0, res.length);
            done();
        });
    });
});
