Tds.Views.SetProductStatuses = Backbone.View.extend({

    events: {
        'click #create-status-button'         : 'createProductStatus',
        'click .edit-product-status'          : 'editProductStatus',
        'click .delete-product-status'        : "deleteProductStatus"
    },

    initialize: function() {
        this.template= _.template($('#tpl-set-product-statuses').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    },

    afterRender: function() {
        this.getData();
    },

    getData: function() {
        var me = this,
            collection = new Tds.Collections.ProductStatus;

        collection.fetch({
            success: function(collection, response) {
                if(collection){
                    me.fillTable(collection);
                } else {
                    alert(response['error_message']);
                }
            },
            failure: function() {

            }
        });

        return this;
    },

    fillTable: function(collection) {
        var me = this,
            tableContentText = '';

        this.$('#product-status-grid').jsGrid({
            width: "100%",

            sorting: true,
            paging: true,
            autoload: true,

            controller: {
                loadData: function() {
                    var d = $.Deferred();

                    $.ajax({
                        url: "/productStatus",
                        dataType: "json"
                    }).done(function(response) {
                        d.resolve(response.data);
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
                            '<input class="jsgrid-button jsgrid-edit-button edit-product-status" data-product-status-id="'+item.id + '" type="button" title="Edit">' +
                            '<input class="jsgrid-button jsgrid-delete-button delete-product-status" data-product-status-id="'+item.id + '" type="button" title="Delete">' +
                            '</td>';
                    }
                }
            ]
        });

        return this;
    },

    createProductStatus: function () {
        var productStatusView = new Tds.Views.ProductStatuses();
        productStatusView.setModel(new Tds.Models.ProductStatus);

        Tds.getView('Modal').setMainContainer('main-container')
            .setTitle('Create product status')
            .setSaveTitle('Save')
            .setCloseTitle('Cancel')
            .setView(productStatusView)
            .show();
    },

    editProductStatus: function(ev){
        var me = this,
            productStatusId = $(ev.currentTarget).data('product-status-id'),
            productStatusView  = new Tds.Views.ProductStatuses(),
            productStatusModel = new Tds.Models.ProductStatus();

        productStatusModel.fetch({
            url: '/productStatus/' + productStatusId,
            success: function (model, response, options) {
                productStatusView.setIsEditView(true)
                    .setModel(model)
                    .setProductStatusId(productStatusId);

                Tds.getView('Modal').setMainContainer('main-container')
                    .setTitle('Edit Product Status')
                    .setSaveTitle('Save')
                    .setCloseTitle('Cancel')
                    .setView(productStatusView)
                    .show();
            },
            error: function (collection, response, options) {

                alert('ERROR!!')
                //create error handler...
            }
        });
    },

    deleteProductStatus: function(ev){
        var me = this,
            productStatusId = $(ev.currentTarget).data('product-status-id'),
            productStatusModel = new Tds.Models.ProductStatus({id: productStatusId});

        productStatusModel.destroy({
            url: 'productStatus/' + productStatusId,
            success: function(model, response) {
                this.$('#product-status-grid').jsGrid('loadData');
            }
        });
    }


});