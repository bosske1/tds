Tds.Views.SetSegments = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-set-segments').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    },

    afterRender: function() {
        this.getData();
    },

    getData: function() {
        var me = this,
            collection = new Tds.Collections.Segment;

        collection.fetch({
            success: function(collection, response){
                if(collection){
                    me.fillTable(collection);
                } else {
                    alert(response['error_message']);
                }
            },
            failure: function(){

            }
        });

        return this;
    }
});