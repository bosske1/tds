/**
 * Created by bojanic on 1.10.16..
 */
Tds.Views.ProductStatuses = Backbone.View.extend({

    isEditView: false,

    productStatusId: null,

    model: null,

    toPostFormData: [
        'name',
        'organizationUnitId'
    ],

    events: {

    },

    initialize: function() {
        this.template= _.template($('#tpl-product-statuses').html());
    },

    render: function() {
        var html = this.template({
            'model': this.getModel()
        });
        this.$el.html(html);

        this.postRender();

        return this;
    },

    afterRender: function() {

    },

    postRender: function(view) {
        this.bindEvents();
        this.initSelects();

        return this;
    },

    initSelects: function() {
        var me = this;

        Tds.getService('CollectionDataContainer').clear('OrganizationUnits').get('OrganizationUnits', {
            success: function(collection, response) {
                if (collection) {
                    Tds.getHelper('View').setView(me).populateSelect('organizationUnitId', collection, me.model.get('organizationUnitId'));
                } else {
                    alert('Error fetching organization units');
                }
            }
        });
    },

    bindEvents: function() {
        var me = this;

        this.off('saveEvent');
        this.on('saveEvent', this.onSave, this);

        return this;
    },

    setProductStatusId: function(ProductStatusId) {
        this.ProductStatusId = ProductStatusId;
    },

    getProductStatusId: function() {
        return this.ProductStatusId;
    },

    setModel: function(model) {
        this.model = model;

        return this;
    },

    getModel: function() {
        return this.model;
    },

    setIsEditView: function(isEditView) {
        this.isEditView = isEditView;

        return this;
    },

    getIsEditView: function() {
        return this.isEditView;
    },

    onSave: function () {
        var me = this,
            router = new Tds.Router(),
            productStatus = this.getModel(),
            data = {};

        if(!Tds.getHelper('View').checkMandatoryFields('segment-form')) {
            Tds.getView('Modal').showError('Check mandatory fields!');

            return false;
        }

        $.each(me.toPostFormData, function(index, item) {
            data[item] = $('#' + item).val();
        });

        productStatus.set(data);
        productStatus.save(null, {
            url: me.getSaveUrl(),
            success: function (model, response) {
                Tds.getView('Modal').hide();
                Backbone.history.navigate('settings/productStatus');
                window.location.reload();
            },
            error: function (model, response) {
                Tds.getView('Modal').showError('Error occurred!');
            }
        });
    },

    getSaveUrl: function() {
        if(this.getIsEditView() && this.setProductStatusId() != null){
            return '/productStatus/' + this.setProductStatusId();
        } else {
            return '/productStatus';
        }
    }



});