/**
 * Created by bojanic on 13.9.16..
 */
Tds.Views.SearchAddEdit = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-search-add-edit').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        this.afterRender();
        return this;
    },

    afterRender: function() {

        //render filters
        var tdsListFilters = new Tds.Views.TdsListFilters({

        });
        this.$el
            .find('#filters-container')
            .html((tdsListFilters).render().$el);

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
                "<td>" +
                "<span><a href='#tds/edit/"+ model.get('id') + "' class='fa fa-fw fa-edit'></a></span>" +
                "</td>"+
                "</tr>";
        });

        this.$('#table-content').append(tableContentText);

        return this;
    }

});