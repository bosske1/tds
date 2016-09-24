Tds.Views.Segment = Backbone.View.extend({

    isEditView: false,

    segmentId: null,

    model: null,

    events: {

    },

    initialize: function() {
        this.template= _.template($('#tpl-set-segments').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

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
    }
});