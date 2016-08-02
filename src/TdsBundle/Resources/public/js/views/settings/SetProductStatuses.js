Tds.Views.SetProductStatuses = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-set-product-statuses').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});