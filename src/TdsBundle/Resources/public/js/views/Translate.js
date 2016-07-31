Tds.Views.Translate = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-translate').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});