var app = angular.module('app')

app.controller('mainController', function ($scope, $http) {
    $scope.message = 'Everyone come and see how good I look!';

    $http.get('https://quiet-crag-78158.herokuapp.com/api/pedido').
        then(function (response) {
            $scope.pedidos = response.data;
        });
});