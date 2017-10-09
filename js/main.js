var app = angular.module('app', ['ngRoute']);

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
                    description: "Indicação do servidor REST.",
                    default: "https://rest-on-demand.herokuapp.com"
                },
                name: {
                    type: "string",
                    description: "Objeto a ser criado. Utilize CamelCase.",
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
                    },
                    default: [
                        {
                            type: "string",
                            attribute: "_id",
                            display:"Id"
                        }
                    ]
                }
            }
        }
    });
}