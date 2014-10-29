X.connect('http://127.0.0.1:8083').config({token:'14143'}).ready(function(remote){
    var Person = window.Person = X.model('person', {
        name: 'String',
        age: 'Number'
    });

    Person.exec({
        method: 'find',
        args: {}
    },function(err, result){
        console.log(err, result);
    });

    /*Person.create({
        name: 'bob',
        age: 15
    }, function(err, bob){
        if(err){
            console.error(err);
        }else{
            Person.list({},function(err, result){
                console.log(err, result);

            });
        }
    });*/
});