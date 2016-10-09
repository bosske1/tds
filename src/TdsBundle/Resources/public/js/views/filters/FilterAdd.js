Tds.Views.FilterAdd = Backbone.View.extend({

    events : {
        'click #filter-add' : 'onFilterAddButtonClick',
        'click #filter-search' : 'onFilterSearchButtonClick'
    },

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

    onFilterAddButtonClick : function(){

        if(!Tds.getHelper('View').checkMandatoryFields('filter-add-form')) {
            Tds.getView('Modal').showError('Check mandatory fields!');

            return false;
        }

        this.model.save({
            success : function(response){

            },
            error   : function(response, message){

            }
        });
    },

    onFilterSearchButtonClick : function(){
        $('#search-grid-container').html('fjsd')
    }

});