Tds.Views.SetSegments = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-set-segments').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});