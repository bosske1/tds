Tds.Views.SetPrefixes = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-set-prefixes').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});