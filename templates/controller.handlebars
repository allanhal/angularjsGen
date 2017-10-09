var app = angular.module('app')

app.controller('tableController', function ($scope, $http) {
    $scope.message = '2-way data binding updating with REST interface';

    $scope.pedidoFormKeyUp = function () {
        $scope.pedidoFormChanged = true;
    };

    var urlRoot = "https://quiet-crag-78158.herokuapp.com/api/pedido";
    $scope.editPedido = function (pedido) {
        if ($scope.pedidoFormChanged) {
            //
            alertify
                .okBtn("Sim")
                .cancelBtn("Não")
                .confirm("Deseja salvar informação digitada?", function (ev) {
                    $scope.submitPedido()
                }, function (ev) {
                    setPedidoForm(pedido)
                });
            //
        } else {
            setPedidoForm(pedido)
        }

    };

    function setPedidoForm(pedido) {
        $scope.pedidoFormChanged = false
        $scope.pedidoForm = pedido
    }

    $scope.submitPedido = function () {
        var method = "";
        var id = $scope.pedidoForm._id;
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
            data: angular.toJson($scope.pedidoForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).
            then(function successCallback(response) {
                alertify.success("Pedido salvo.");
                $scope.refreshPedidos()
            }, function errorCallback(response) {
                alertify.error("Pedido não salvo.");
                $scope.refreshPedidos()
            });
    };

    $scope.removePedido = function (pedido) {
        $http({
            method: 'DELETE',
            url: urlRoot + '/' + pedido._id
        }).then(function successCallback(response) {
            alertify.success("Pedido deletado.");
            $scope.refreshPedidos()
        }, function errorCallback(response) {
            alertify.error("Pedido não deletado.");
            $scope.refreshPedidos()
        });
    };

    $scope.refreshPedidos = function () {
        $scope.pedidoFormChanged = false
        $http.get('https://quiet-crag-78158.herokuapp.com/api/pedido').
            then(function (response) {
                $scope.pedidos = response.data;
            });
    };

    $scope.refreshPedidos()
});