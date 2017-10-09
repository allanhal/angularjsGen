var app = angular.module('app')

var zip = new JSZip();
var zipName = "appAngularJS";

var indexTemplate;
var locationProviderTemplate;
var sidebarTemplate;
var viewTemplate;
var controllerTemplate;

var editor;

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

    function executeTemplate() {
        zipReset();

        var pedidoJson = editor.getValue()
        compile("pedido", pedidoJson)
        // $.getJSON("json/pedido.json", function (pedidoJson) {
        //     compile("pedido", pedidoJson)
        // })
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
        // Initialize the editor with a JSON schema
        editor = new JSONEditor(document.getElementById('editor_holder'), {
            // Disable additional properties
            no_additional_properties: true,
            schema: {
                type: "object",
                title: "Create a new model",
                properties: {
                    urlApi: {
                        type: "string",
                        description: "Url para a api deste objeto",
                        default: "https://rest-on-demand.herokuapp.com/api/"
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

        // Hook up the submit button to log to the console
        document.getElementById('submit').addEventListener('click', function () {
            // Get the value from the editor
            var result = editor.getValue()

            var blob = new Blob([JSON.stringify(result)], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "Pedido.json");
        });
    }

    zipReset()
    editorConfiguration()
});