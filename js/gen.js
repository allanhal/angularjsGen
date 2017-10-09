var app = angular.module('app')

var zipClient = new JSZip();

var indexTemplate;
var headerTemplate;
var footerTemplate;
var cssTemplate;
var locationProviderTemplate;
var sidebarTemplate;
var viewTemplate;
var controllerTemplate;


var zipServer = new JSZip();
var zipName = "appAngularJS";

var editor;

app.controller('genController', function ($scope, $http) {

    /* ================================================================ */
    /* ========================= CLIENT =============================== */
    /* ================================================================ */

    function defaultClientTemplates() {

        $.get('templates/client/mainTemplate.css', function (template) {
            var compiled = Handlebars.compile(template)
            var content = compiled({})
            zipClient.folder("css").file('main.css', content);
        }, 'html')

        $.get('templates/client/headerTemplate.html', function (template) {
            var compiled = Handlebars.compile(template)
            var content = compiled({})
            zipClient.file('header.html', content);
        }, 'html')

        $.get('templates/client/footerTemplate.html', function (template) {
            var compiled = Handlebars.compile(template)
            var content = compiled({})
            zipClient.file('footer.html', content);
        }, 'html')

        $.get('templates/client/index.handlebars', function (template) {
            indexTemplate = template;
        }, 'html')

        $.get('templates/client/locationProviderTemplate.js', function (template) {
            locationProviderTemplate = template;
        }, 'html')

        $.get('templates/client/sidebar.handlebars', function (template) {
            sidebarTemplate = template;
        }, 'html')

        $.get('templates/client/view.handlebars', function (template) {
            viewTemplate = template;
        }, 'html')

        $.get('templates/client/controllerTemplate.js', function (template) {
            controllerTemplate = template;
        }, 'html')

    }

    function zipClientReset() {
        zipClient = new JSZip()
        zipClient = zipClient.folder(zipName)
        zipClient.file("readme.txt", "You read me")
    }

    function zipAddRootHtml(title, content) {
        zipClient.file(title + ".html", content);
    }

    function zipAddPages(title, content) {
        zipClient.folder("pages").file(title + ".html", content);
    }

    function zipAddJs(title, content) {
        zipClient.folder("js").file(title + ".js", content);
    }

    function zipGenerate() {
        zipClient.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, zipName + ".zip");
            });
    }

    function downloadClientApp() {
        NProgress.start()

        var json = editor.getValue()
        var create = json.url + "/create/" + firstLowerCase(json.name);
        $.get(create, function (data, status) {
            alertify.success("Data: " + data + "\nStatus: " + status);
        });

        var newJson = jQuery.extend(true, {}, json);

        newJson.url = json.url + "/api/";

        compileAllClientFiles(json.name, newJson)

        zipClientReset();

        NProgress.done()
    }

    function compileAllClientFiles(name, json) {
        defaultClientTemplates()

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

    $scope.downloadClientApp = downloadClientApp;

    zipClientReset()


    /* ================================================================ */
    /* ========================= SERVER =============================== */
    /* ================================================================ */
    function zipServerReset() {
        zipServer = new JSZip()
        zipServer = zipServer.folder(zipName)
        zipServer.file("readme.txt", "You read me")
    }

    function downloadServerApp() {
        NProgress.start()

        // compileAllClientFiles(json.name, newJson)

        zipClientReset();

        NProgress.done()
    }

    $scope.downloadServerApp = downloadServerApp;

    zipServerReset()

    /* ================================================================ */
    /* ========================== MAIN ================================ */
    /* ================================================================ */

    editorConfiguration();
});