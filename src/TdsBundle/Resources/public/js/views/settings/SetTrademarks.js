Tds.Views.SetTrademarks = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-set-trademarks').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});