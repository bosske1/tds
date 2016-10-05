Tds.Views.FilterAdd = Backbone.View.extend({

    events : {
        'click #filter-add' : 'onFilterAddButtonClick'
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

        //do some here check i guess...

        this.model.save({
            success : function(response){

            },
            error   : function(response, message){

            }
        });
    }

});