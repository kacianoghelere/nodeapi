angular.module('scotchTodo').controller('MainController', MainController);

MainController.$inject = ['$scope', '$http', 'TodoService'];

function MainController($scope, $http, Todo) {
    $scope.formData = {};

    Todo.get().success(function (data) { $scope.todos = data; });

    $scope.createTodo = function () {
        if (!$.isEmptyObject($scope.formData)) {
            Todo.create($scope.formData).success(function (data) {
                $scope.formData = {};
                $scope.todos = data;
            });
        }
    };

    $scope.deleteTodo = function (id) {
        Todo.destroy(id).success(function (data) { $scope.todos = data; });
    };

    $scope.updateTodo = function (todo) {
        console.log("Update =>", todo);
        if (todo) {
            Todo.update(todo._id, {done: !todo.done}).success(function (data) {
                $scope.formData = {};
                $scope.todos = data;
            });
        }
    };
};