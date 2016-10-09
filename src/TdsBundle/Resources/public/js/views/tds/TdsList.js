Tds.Views.TdsList = Backbone.View.extend({

    filters : {},

    initialize: function() {
        this.template= _.template($('#tpl-tds-list').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    },

    afterRender: function() {

        var tdsListFilters = new Tds.Views.TdsListFilters({
            tdsListView : this
        });
        this.$el
            .find('#tds-list-filter-container')
            .html((tdsListFilters).render().$el);
    },

    fillTable: function(collection) {
        var me = this;

        this.$('#tds-list-table').jsGrid({
            width: "100%",

            sorting: true,
            paging: true,
            autoload: true,

            controller: {
                loadData: function() {
                    var d = $.Deferred();

                    $.ajax({
                        url: "/tds",
                        data : {
                            filter : me.getFilters()
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

    setFilters : function(filters){
        this.filters = filters;

        return this;
    },

    getFilters : function(){
        return this.filters;
    }

});