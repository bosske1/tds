Tds.Views.Segment = Backbone.View.extend({

    isEditView: false,

    segmentId: null,

    model: null,

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
        alert('radi');
    }
});