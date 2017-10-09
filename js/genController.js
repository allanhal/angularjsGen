var app = angular.module('app')

var zip = new JSZip();
var zipName = "angularJSapp";
var viewTemplate;
var controllerTemplate;

app.controller('genController', function ($scope, $http) {

    function loadTemplates(params) {
        $.get('templates/pedido.handlebars', function (template) {
            htmlTemplate.push(template);
        }, 'html')

    }
    Handlebars.registerHelper('firstLowerCase', function (str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    });

    Handlebars.registerHelper('firstUpperCase', function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    });

    $scope.executeZip = executeZip;
    $scope.executeTemplate = executeTemplate;

    function executeZip(params) {
        zipReset();
        zipAddPage("Hello1.txt", "Hello World1")
        zipAddPage("Hello2.txt", "Hello World2")
        zipAddPage("Hello3.txt", "Hello World3")
        zipGenerate()
    }

    function zipReset() {
        zip = new JSZip();
        zip = zip.folder(zipName)
        zip.file("readme.txt", "You read me");
    }

    function zipAddPage(title, content) {
        zip.folder("pages").file(title, content);
    }

    function zipGenerate() {
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, zipName + ".zip");
            });
    }

    function executeTemplate(params) {
        zipReset();
        $.get('templates/pedido.handlebars', function (template) {
            htmlTemplate = template;

            $.getJSON("json/pedido.json", function (pedidoJson) {

                compile("pedido", pedidoTemplate, pedidoJson)

            })

        }, 'html')
    }

    function compile(name, template, json) {

        var templateCompiled = Handlebars.compile(template);
        var result = templateCompiled(json)

        $("#compiled").html(result)
        $("#compiledPre").text(result)

        zipAddPage(name + ".html", result)
        zipGenerate()

    }
});