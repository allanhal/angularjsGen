var app = angular.module('app')

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '{{firstLowerCase name}}.html',
            controller: '{{firstLowerCase name}}Controller'
        });
});