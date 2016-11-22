// load the todo model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function (app) {
    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', find);
    // create todo and send back all todos after creation
    app.post('/api/todos', create);
    // update todo and send back all todos after creation
    app.put('/api/todos/:todo_id', update);
    // delete a todo
    app.delete('/api/todos/:todo_id', destroy);
    // root application
    app.get('*', application);

    function application(req, res) {
        res.sendfile('./public/index.html');
    }

    function find(req, res) {
        Todo.find(function (err, todos) {
            if (err) res.send(err)
            res.json(todos);
        });
    }

    function create(req, res) {
        Todo.create({text : req.body.text, done : false}, function (err, todo) {
            if (err) res.send(err);

            Todo.find(function (err, todos) {
                if (err) res.send(err);
                res.json(todos);
            });
        });
    }

    function update(req, res) {
        var params = {$set: {done : req.body.done}};
        Todo.update({_id: req.params.todo_id}, params, function (err, todo) {
            if (err) { res.send(err); return; }
            Todo.find(function (err, todos) {
                if (err) { res.send(err); return; }
                res.json(todos);
            });
        });
    }

    function destroy(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function (err, todo) {
            if (err) { res.send(err); return; }

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err) { res.send(err); return; }
                res.json(todos); // return all todos in JSON format
            });
        });
    }
};