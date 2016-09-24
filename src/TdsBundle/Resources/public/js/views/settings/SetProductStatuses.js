Tds.Views.SetProductStatuses = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-set-product-statuses').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        this.afterRender();
        return this;
    },
    //TODO understand how loading in simfony works
    afterRender: function() {
        this.getData();

    },

    getData: function() {
        var me = this,
            collection = new Tds.Collections.ProductStatus;

        console.log(collection);
        collection.fetch({
            success: function(collection, response){
                if(collection){
                    //me.fillTable(collection);
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
                "<td>" +
                "<span><a href='#tds/edit/"+ model.get('id') + "' class='fa fa-fw fa-edit'></a></span>" +
                "</td>"+
                "</tr>";
        });

        this.$('#product-statuses-table-content').append(tableContentText);

        return this;
    }


});