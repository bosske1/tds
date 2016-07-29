Tds.Views.TdsList = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-tds-list').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});