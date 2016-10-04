Tds.Views.Segment = Backbone.View.extend({

    isEditView: false,

    segmentId: null,

    model: null,

    toPostFormData: [
        'name',
        'organizationUnitId'
    ],

    events: {

    },

    initialize: function() {
        this.template = _.template($('#tpl-segment').html());
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
        this.initSelects();
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

    postRender: function(view) {
        this.bindEvents();

        return this;
    },

    setSegmentId: function(segmentId) {
        this.segmentId = segmentId;
    },

    getSegmentId: function() {
        return this.segmentId;
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

    getSaveUrl: function() {
        if(this.getIsEditView() && this.getSegmentId() != null){
            return '/segment/' + this.getSegmentId();
        } else {
            return '/segment';
        }
    },

    onSave: function () {
        var me = this,
            router = new Tds.Router(),
            segment = this.getModel(),
            data = {};

        if(!Tds.getHelper('View').checkMandatoryFields('segment-form')) {
            Tds.getView('Modal').showError('Check mandatory fields!');

            return false;
        }

        $.each(me.toPostFormData, function(index, item) {
            data[item] = $('#' + item).val();
        });

        segment.set(data);
        segment.save(null, {
            url: me.getSaveUrl(),
            success: function (model, response) {
                Tds.getView('Modal').hide();
                Backbone.history.navigate('settings/segments');
                window.location.reload();
            },
            error: function (model, response) {
                Tds.getView('Modal').showError('Error occurred!');
            }
        });
    }
});