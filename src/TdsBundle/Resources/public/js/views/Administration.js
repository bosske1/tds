Tds.Views.Administration = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-administration').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});