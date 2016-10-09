Tds.Views.TemplateList = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-templates').html());
    },

    events : {
        'click #create-template-button'  : 'onCreateTemplateButtonClick',
        'click .edit-template'           : 'onEditTemplateButtonClick',
        'click .delete-template'         : 'onDeleteTemplateButtonClick'
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    },

    afterRender : function(){
        this.fillTable();

        return this;
    },

    fillTable: function(collection) {
        var me = this;

        this.$('#template-list').jsGrid({
            width: "100%",

            sorting: true,
            paging: true,
            autoload: true,

            controller: {
                loadData: function() {
                    var d = $.Deferred();

                    $.ajax({
                        url: "/template",
                        data : {
                            filter : {
                                'isTemplate' : 1
                            }
                        },
                        dataType: "json"
                    }).done(function(response) {
                        d.resolve(response.data);

                        Tds.fixContainerLayout();
                    });

                    return d.promise();
                }
            },

            fields: [
                {
                    title: 'Name',
                    name: "name",
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
                                    '<input class="jsgrid-button jsgrid-edit-button edit-template" data-template-id="'+item.id + '" type="button" title="Edit">' +
                                    '<input class="jsgrid-button jsgrid-delete-button delete-template" data-template-id="'+item.id + '" type="button" title="Delete">' +
                                '</td>';
                    }
                }
            ]
        });

        return this;
    },

    onCreateTemplateButtonClick : function(){
        var router = new Tds.Router();

        router.navigate('/template/create', { trigger : true });
    },

    onEditTemplateButtonClick : function(ev){
        var me = this,
            router = new Tds.Router(),
            templateId = $(ev.currentTarget).data('template-id');

        router.navigate('/template/edit/' + templateId, { trigger : true });
    },

    onDeleteTemplateButtonClick : function(ev){
        var me = this,
            templateId = $(ev.currentTarget).data('template-id');
            templateModel = new Tds.Models.Tds({id: templateId});

        templateModel.destroy({
            url: 'template/' + templateId,
            success: function(model, response) {
                me.$('#template-list').jsGrid('loadData');
            }
        });
    }
});