var app = angular.module('app')

var zip = new JSZip();
var zipName = "appAngularJS";

var indexTemplate;
var locationProviderTemplate;
var sidebarTemplate;
var viewTemplate;
var controllerTemplate;

app.controller('genController', function ($scope, $http) {

    function loadTemplates() {
        $.get('templates/index.handlebars', function (template) {
            indexTemplate = template;
        }, 'html')

        $.get('templates/locationProviderTemplate.js', function (template) {
            locationProviderTemplate = template;
        }, 'html')

        $.get('templates/sidebar.handlebars', function (template) {
            sidebarTemplate = template;
        }, 'html')

        $.get('templates/view.handlebars', function (template) {
            viewTemplate = template;
        }, 'html')

        $.get('templates/controllerTemplate.js', function (template) {
            controllerTemplate = template;
        }, 'html')
    }

    function loadDefaultFiles() {
        var files = ["footer", "header"]

        files.forEach(function (element) {
            $.get('templates/defaultFiles/' + element + '.html', function (template) {
                zipAddRootHtml(element, template)
            }, 'html')
        }, this);

        $.get('templates/defaultFiles/main.css', function (template) {
            zipAddCss("main", template)
        }, 'html')

    }

    Handlebars.registerHelper('firstLowerCase', function (str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    });

    Handlebars.registerHelper('firstUpperCase', function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    });

    $scope.executeTemplate = executeTemplate;

    function zipReset() {
        zip = new JSZip()
        zip = zip.folder(zipName)
        zip.file("readme.txt", "You read me")

        loadTemplates()
        loadDefaultFiles()
    }

    function zipAddCss(title, content) {
        zip.folder("css").file(title + ".css", content);
    }

    function zipAddRootHtml(title, content) {
        zip.file(title + ".html", content);
    }

    function zipAddPages(title, content) {
        zip.folder("pages").file(title + ".html", content);
    }

    function zipAddJs(title, content) {
        zip.folder("js").file(title + ".js", content);
    }

    function zipGenerate() {
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, zipName + ".zip");
            });
    }

    function executeTemplate(params) {
        zipReset();

        $.getJSON("json/pedido.json", function (pedidoJson) {
            compile("pedido", pedidoJson)
        })
    }

    function compile(name, json) {
        var indexCompiled = Handlebars.compile(indexTemplate);
        var locationProviderTemplateCompiled = Handlebars.compile(locationProviderTemplate);
        var sidebarTemplateCompiled = Handlebars.compile(sidebarTemplate);
        var viewTemplateCompiled = Handlebars.compile(viewTemplate);
        var controllerTemplateCompiled = Handlebars.compile(controllerTemplate);

        zipAddRootHtml("index", indexCompiled(json))
        zipAddJs("locationProvider", locationProviderTemplateCompiled(json))
        zipAddRootHtml("sidebar", sidebarTemplateCompiled(json))

        zipAddRootHtml(name, viewTemplateCompiled(json))
        zipAddJs(name, controllerTemplateCompiled(json))

        zipGenerate()
    }

    zipReset()
});