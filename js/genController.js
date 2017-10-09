var app = angular.module('app')

var zip = new JSZip();
var zipName = "appAngularJS";

var indexTemplate;
var headerTemplate;
var footerTemplate;
var cssTemplate;
var locationProviderTemplate;
var sidebarTemplate;
var viewTemplate;
var controllerTemplate;

var editor;

app.controller('genController', function ($scope, $http) {

    function loadTemplates() {

        $.get('templates/mainTemplate.css', function (template) {
            var compiled = Handlebars.compile(template)
            var content = compiled({})
            zip.folder("css").file('main.css', content);
        }, 'html')

        $.get('templates/headerTemplate.html', function (template) {
            var compiled = Handlebars.compile(template)
            var content = compiled({})
            zip.file('header.html', content);
        }, 'html')

        $.get('templates/footerTemplate.html', function (template) {
            var compiled = Handlebars.compile(template)
            var content = compiled({})
            zip.file('footer.html', content);
        }, 'html')

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

    Handlebars.registerHelper('firstLowerCase', function (str) {
        return firstLowerCase(str)
    });

    Handlebars.registerHelper('firstUpperCase', function (str) {
        return firstUpperCase(str)
    });

    function firstLowerCase(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    function firstUpperCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function zipReset() {
        zip = new JSZip()
        zip = zip.folder(zipName)
        zip.file("readme.txt", "You read me")

        loadTemplates()
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

    function executeTemplate() {
        NProgress.start()

        var json = editor.getValue()
        var create = json.url + "/create/" + firstLowerCase(json.name);
        $.get(create, function (data, status) {
            alertify.success("Data: " + data + "\nStatus: " + status);
        });

        var newJson = jQuery.extend(true, {}, json);

        newJson.url = json.url + "/api/";

        compile(json.name, newJson)

        zipReset();

        NProgress.done()
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

    function editorConfiguration() {
        JSONEditor.defaults.options.theme = 'bootstrap2';
        JSONEditor.defaults.options.iconlib = "fontawesome4";
        JSONEditor.defaults.options.disable_collapse = true;
        JSONEditor.defaults.options.disable_edit_json = true;
        JSONEditor.defaults.options.disable_properties = true;

        editor = new JSONEditor(document.getElementById('editor_holder'), {
            schema: {
                type: "object",
                title: "Create a new model",
                properties: {
                    url: {
                        type: "string",
                        description: "Url para a api deste objeto",
                        default: "https://rest-on-demand.herokuapp.com"
                    },
                    name: {
                        type: "string",
                        default: "Pedido"
                    },
                    attributes: {
                        type: "array",
                        format: "table",
                        title: "Attributes",
                        uniqueItems: true,
                        items: {
                            type: "object",
                            title: "Attribute",
                            properties: {
                                type: {
                                    type: "string",
                                    enum: [
                                        "string",
                                        "int"
                                    ],
                                    default: "string"
                                },
                                attribute: {
                                    type: "string"
                                },
                                display: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    $scope.executeTemplate = executeTemplate;

    zipReset()
    editorConfiguration()
});