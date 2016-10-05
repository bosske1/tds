Tds.Views.FilterAdd = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-tds-filters-add').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    },

    afterRender: function() {

    },

    getData: function() {

    }

});