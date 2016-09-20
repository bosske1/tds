/**
 * Created by bojanic on 13.9.16..
 */
Tds.Views.TdsListFilters = Backbone.View.extend({

    events: function(){
        return (Tds.Views.TdsListFilters.prototype.events, {
            "click #reset-filter-button": "resetFilters",
            "click #filter-button": "filterTdsList"
        })


    },

    initialize: function() {
        this.template= _.template($('#tpl-tds-list-filters').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        this.afterRender();
        return this;
    },

    afterRender: function() {
        this.datepicker();
    },

    datepicker: function() {
        this.$('#created').datepicker();

        return this;
    },

    resetFilters: function(){
        this.$('#created').val('');
        this.$('#name').val('');

        //call ajax again to update list
        return this;
    },

    filterTdsList: function() {
        var me = this;

        var created = this.$('#created').val();
        var name    = this.$('#name').val();

        collection = new Tds.Collections.Tds;

        //set filter object with collected filters
        collection.fetch({
            data: {
                dt_created: created,
                name: name},
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