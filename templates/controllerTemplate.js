var app = angular.module('app', ['ngRoute']);

app.controller('{{firstLowerCase name }}Controller', function ($scope, $http) {

    $scope.{{firstLowerCase name }}FormKeyUp = function () {
        $scope.{{firstLowerCase name }}FormChanged = true;
    };

    var urlRoot = "{{urlApi}}{{firstLowerCase name }}";
    $scope.edit{{ name }} = function ({{firstLowerCase name }}) {
        if ($scope.{{firstLowerCase name }}FormChanged) {
            //
            alertify
                .okBtn("Sim")
                .cancelBtn("Não")
                .confirm("Deseja salvar informação digitada?", function (ev) {
                    $scope.submit{{ name }}()
                }, function (ev) {
                    set{{ name }}Form({{firstLowerCase name }})
                });
            //
        } else {
            set{{ name }}Form({{firstLowerCase name }})
        }

    };

    function set{{ name }}Form({{firstLowerCase name }}) {
        $scope.{{firstLowerCase name }}FormChanged = false
        $scope.{{firstLowerCase name }}Form = {{firstLowerCase name }}
    }

    $scope.submit{{ name }} = function () {
        var method = "";
        var id = $scope.{{firstLowerCase name }}Form._id;
        if (id) {
            method = "PUT";
            url = urlRoot + '/' + id;
        } else {
            method = "POST";
            url = urlRoot;
        }

        $http({
            method: method,
            url: url,
            data: angular.toJson($scope.{{firstLowerCase name }}Form),
            headers: {
                'Content-Type': 'application/json'
            }
        }).
            then(function successCallback(response) {
                alertify.success("{{ name }} salvo.");
                $scope.refresh{{ name }}s()
            }, function errorCallback(response) {
                alertify.error("{{ name }} não salvo.");
                $scope.refresh{{ name }}s()
            });
    };

    $scope.remove{{ name }} = function ({{firstLowerCase name }}) {
        $http({
            method: 'DELETE',
            url: urlRoot + '/' + {{firstLowerCase name }}._id
        }).then(function successCallback(response) {
            alertify.success("{{ name }} deletado.");
            $scope.refresh{{ name }}s()
        }, function errorCallback(response) {
            alertify.error("{{ name }} não deletado.");
            $scope.refresh{{ name }}s()
        });
    };

    $scope.refresh{{ name }}s = function () {
        $scope.{{firstLowerCase name }}FormChanged = false
        $http.get('{{urlApi}}{{firstLowerCase name }}').
            then(function (response) {
                $scope.{{firstLowerCase name }}s = response.data;
            });
    };

    $scope.refresh{{ name }}s()
});