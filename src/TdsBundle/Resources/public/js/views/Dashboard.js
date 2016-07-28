Tds.Views.Dashboard = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-dashboard').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});