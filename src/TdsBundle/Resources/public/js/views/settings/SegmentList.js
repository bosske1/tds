Tds.Views.SegmentList = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-set-segments').html());
    },

    events: {
        'click #create-segment-button'  : 'createSegment',
        'click .edit-segment'           : 'editSegment'
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
            success: function(collection, response) {
                if(collection){
                    me.fillTable(collection);
                } else {
                    alert(response['error_message']);
                }
            },
            failure: function() {

            }
        });

        return this;
    },

    fillTable: function(collection) {
        var me = this,
            tableContentText = '';

        collection.each(function(model) {
            tableContentText +=
                "<tr>"+
                    "<td>"+model.get('name')+"</td>"+
                    "<td>"+model.get('created_by')+"</td>"+
                    "<td>"+model.get('dt_created')+"</td>"+
                    "<td>" +
                        "<span><a data-segment-id='"+model.get('id')+"' class='fa fa-fw fa-edit edit-segment'></a></span>" +
                    "</td>"+
                "</tr>";
        });

        this.$('#table-content').append(tableContentText);

        return this;
    },

    createSegment: function () {
        var segmentView = new Tds.Views.Segment();
        segmentView.setModel(new Tds.Models.Segment);

        Tds.getView('Modal').setMainContainer('main-container')
            .setTitle('Create segment')
            .setSaveTitle('Save')
            .setCloseTitle('Cancel')
            .setView(segmentView)
            .show();
    },

    editSegment: function(ev) {
        var me = this,
            segmentId = $(ev.currentTarget).data('segment-id'),
            segmentView  = new Tds.Views.Segment(),
            segmentModel = new Tds.Models.Segment();

        segmentModel.fetch({
            url: '/segment/' + segmentId,
            success: function (model, response, options) {
                segmentView.setIsEditView(true)
                    .setModel(model)
                    .setSegmentId(segmentId);

                Tds.getView('Modal').setMainContainer('main-container')
                    .setTitle('Edit segment')
                    .setSaveTitle('Save')
                    .setCloseTitle('Cancel')
                    .setView(segmentView)
                    .show();
            },
            error: function (collection, response, options) {

                //create error handler...
            }
        });
    }
});