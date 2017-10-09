var app = angular.module('app')

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })
        .when('/{{firstLowerCase name}}', {
            templateUrl: '{{firstLowerCase name}}.html',
            controller: '{{firstLowerCase name}}Controller'
        });
});

app.controller('mainController', function ($scope, $http) {
    $http.get('{{url}}{{firstLowerCase name}}').
        then(function (response) {
            $scope.{{firstLowerCase name}}s = response.data;
        });
});