Tds.Views.Segment = Backbone.View.extend({

    isEditView: false,

    segmentId: null,

    model: null,

    toPostFormData: [
        'name'
    ],

    events: {

    },

    initialize: function() {
        this.template= _.template($('#tpl-segment').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        this.postRender();

        return this;
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

    onSave: function () {
        var me = this,
            router = new Tds.Router();
        var data = {};

        if(!Tds.getHelper('View').checkMandatoryFields('segment-form')) {
            Tds.getView('Modal').showError('Check mandatory fields!');

            return false;
        }

        $.each(me.toPostFormData, function(index, item) {
            data[item] = $('#' + item).val();
        });

        var segment = new Tds.Models.Segment(data);

        segment.save(null, {
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