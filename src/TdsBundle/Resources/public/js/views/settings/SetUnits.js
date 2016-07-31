Tds.Views.SetUnits = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-set-units').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});