Tds.Views.Templates = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-templates').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});