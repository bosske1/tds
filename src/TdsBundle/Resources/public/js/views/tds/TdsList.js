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
        var me = this;
        var postData = 'some data for request';

        $.ajax({
            type: 'POST',
            //src/TdsBundle/Controller/TdsController.php
            url: "/tds/list",
            data: postData,
            success: function(response){
                if(response.success){
                    me.fillTable(response);
                } else {
                    alert(response.error_message);
                }
            },
            dataType: 'json'
        });

        return this;

    },

    fillTable: function(response) {
        var me = this;

        var data = response.data;

        var text = '';
        for (i = 0; i < data.length; i++) {
        text +=
            "<tr>"+
                "<td>"+data[i].name+"</td>"+
                "<td>"+data[i].created_by+"</td>"+
                "<td>"+data[i].dt_created+"</td>"+
                "<td>"+"menu ikonice"+"</td>"+
            "</tr>";


        }

        this.$('#table-content').append(text);

        return this;
    }

});