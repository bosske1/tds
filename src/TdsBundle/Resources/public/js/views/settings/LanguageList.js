Tds.Views.LanguageList = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-language-list').html());
    },

    events: {
        'click #create-language-button'  : 'createLanguage',
        'click .edit-language'           : 'editLanguage',
        'click .delete-language'         : 'deleteLanguage'
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    },

    afterRender: function() {
        this.loadGrid();
    },

    loadGrid: function() {
        var me = this;

        this.$('#language-list').jsGrid({
            width: "100%",

            sorting: true,
            paging: true,
            autoload: true,

            controller: {
                loadData: function() {
                    var d = $.Deferred();

                    $.ajax({
                        url: "/language",
                        dataType: "json"
                    }).done(function(response) {
                        d.resolve(response.data);
                    });

                    return d.promise();
                }
            },

            fields: [
                {
                    title: 'Lang',
                    name: "lang",
                    type: "text",
                    width: 150
                },
                {
                    title: 'Created by',
                    name: "createdBy",
                    type: "number",
                    width: 50
                },
                {
                    title: 'Created',
                    name: "dtCreated",
                    type: "date",
                    width: 200
                },
                {
                    title: 'Menu',
                    type: "control",
                    cellRenderer: function(value, item) {
                        return '<td class="jsgrid-cell jsgrid-control-field jsgrid-align-center" style="width: 50px;">' +
                            '<input class="jsgrid-button jsgrid-edit-button edit-language" data-language-id="'+item.id + '" type="button" title="Edit">' +
                            '<input class="jsgrid-button jsgrid-delete-button delete-language" data-language-id="'+item.id + '" type="button" title="Delete">' +
                            '</td>';
                    }
                }
            ]
        });

        return this;
    },

    createLanguage: function () {
        var languageView = new Tds.Views.Language();
        languageView.setModel(new Tds.Models.Language);

        Tds.getView('Modal').setMainContainer('main-container')
            .setTitle('Create language')
            .setSaveTitle('Save')
            .setCloseTitle('Cancel')
            .setView(languageView)
            .show();
    },

    editLanguage: function(ev) {
        var me = this,
            languageId = $(ev.currentTarget).data('language-id'),
            languageView  = new Tds.Views.Language(),
            languageModel = new Tds.Models.Language();

        languageModel.fetch({
            url: '/language/' + languageId,
            success: function (model, response, options) {
                languageView.setIsEditView(true)
                    .setModel(model)
                    .setLanguageId(languageId);

                Tds.getView('Modal').setMainContainer('main-container')
                    .setTitle('Edit language')
                    .setSaveTitle('Save')
                    .setCloseTitle('Cancel')
                    .setView(languageView)
                    .show();
            },
            error: function (collection, response, options) {

                //create error handler...
            }
        });
    },

    deleteLanguage: function(ev) {
        var me = this,
            languageId = $(ev.currentTarget).data('language-id'),
            languageModel = new Tds.Models.Language({id: languageId});

        languageModel.destroy({
            url: 'language/' + languageId,
            success: function(model, response) {
                this.$('#language-list').jsGrid('loadData');
            }
        });
    }
});