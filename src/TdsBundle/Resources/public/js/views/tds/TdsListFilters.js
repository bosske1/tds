Tds.Views.TdsListFilters = Backbone.View.extend({

    tdsListView : null,

    initialize: function(options) {
        this.tdsListView = options.tdsListView;
        this.template= _.template($('#tpl-tds-list-filters').html());
    },

    events : {
        'click #tds-list-filter-button' : 'onTdsListFilterButtonClick'
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    },

    afterRender: function() {

    },

    onTdsListFilterButtonClick : function(){
        this.tdsListView.setFilters(this.buildFilters());
        this.tdsListView.fillTable();

        return this;
    },

    buildFilters : function(){
        var filters = {};

        filters['name'] = this.$('#name').val();
        filters['isTemplate'] = 0;

        return filters;
    }

});