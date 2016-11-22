angular.module('scotchTodo').factory('TodoService', TodoService);

TodoService.$inject = ['$http'];

function TodoService($http) {
    return {
        create: create,
        destroy: destroy,
        get : get,
        update: update
    }

    function create(todoData) {
        return $http.post('/api/todos', todoData);
    }

    function destroy(id) {
        return $http.delete('/api/todos/' + id);
    }

    function get() {
        return $http.get('/api/todos');
    }

    function update(id, todoData) {
        return $http.put('/api/todos/' + id, todoData);
    }
};