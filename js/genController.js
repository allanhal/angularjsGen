var app = angular.module('app')

app.controller('genController', function ($scope, $http) {

    Handlebars.registerHelper('firstLowerCase', function (str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    });

    Handlebars.registerHelper('firstUpperCase', function (str) {

        return str.charAt(0).toUpperCase() + str.slice(1);
    });

    $scope.executeTemplate = function (params) {

        $.get('templates/pedido.handlebars', function (template) {
            $.getJSON("json/pedido.json", function (json) {
                var templateCompiled = Handlebars.compile(template);
                var result = templateCompiled(json)

                console.log(result)

                $("#compiled").html(result)

                $("#compiledPre").text(result)
            })
        }, 'html')

    }
});