Tds.Views.TdsListFilters = Backbone.View.extend({

    tdsListView : null,

    initialize: function(options) {
        this.tdsListView = options.tdsListView;
        this.template= _.template($('#tpl-tds-list-filters').html());
    },

    events : {
        'click #tds-list-filter-button' : 'onTdsListFilterButtonClick',
        'click #tds-list-add-button'    : 'onTdsListAddButtonClick'
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

    onTdsListAddButtonClick : function(){
        if(!Tds.getHelper('View').checkMandatoryFields('filter-add-form')) {
            return false;
        }

        this.doSaveFilters();
    },

    doSaveFilters : function(){
        var filters = this.buildFilters(),
            filterModel = new Tds.Models.Filter();

        filterModel.set('name', $('#filter_name').val());
        filterModel.set('data', filters);
        filterModel.save({
            success: function (model, response, options) {

                //do something...
            },
            error: function (collection, response, options) {

                //create error handler...
            }
        });
    },

    buildFilters : function(){
        var filters = {};

        filters['name'] = this.$('#name').val();
        filters['isTemplate'] = 0;

        return filters;
    },

    fillHtml : function(){
        var filterModel = this.tdsListView.filterModel;

        $('#filter_name').val(filterModel.get('name'));

        $.each(filterModel.get('data'), function(filterKey, filterValue){
            $('#' + filterKey).val(filterValue);
        });

        return this;
    }

});