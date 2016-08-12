Tds.Views.TdsList = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-tds-list').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        this.postrender();

        return this;
    },

    postrender: function() {

        this.getData();
    },

    getData: function() {
        var me = this,
            collection = new Tds.Collections.Tds;

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
    },

    fillTable: function(collection) {
        var me = this,
            tableContentText = '';

        collection.each(function(model){
            tableContentText +=
                "<tr>"+
                "<td>"+model.get('name')+"</td>"+
                "<td>"+model.get('created_by')+"</td>"+
                "<td>"+model.get('dt_created')+"</td>"+
                "<td>"+"menu ikonice"+"</td>"+
                "</tr>";
        });

        this.$('#table-content').append(tableContentText);

        return this;
    }

});