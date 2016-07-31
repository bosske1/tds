Tds.Views.SetLabels = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-set-labels').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});