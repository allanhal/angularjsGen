var app = angular.module('app')

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/gen.html',
            controller: 'genController'
        })
        .when('/pedido', {
            templateUrl: 'pages/pedido.html',
            controller: 'pedidoController'
        });
});