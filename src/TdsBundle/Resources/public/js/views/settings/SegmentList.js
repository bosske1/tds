Tds.Views.SegmentList = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-set-segments').html());
    },

    events: {
        'click #create-segment-button'  : 'createSegment',
        'click .edit-segment'           : 'editSegment',
        'click .delete-segment'         : 'deleteSegment'
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
        var me = this;

        this.$('#tds-list').jsGrid({
            width: "100%",

            sorting: true,
            paging: true,
            autoload: true,

            controller: {
                loadData: function() {
                    var d = $.Deferred();

                    $.ajax({
                        url: "/segment",
                        dataType: "json"
                    }).done(function(response) {
                        d.resolve(response.data);
                    });

                    return d.promise();
                }
            },

            fields: [
                {
                    title: 'Name',
                    name: "name",
                    type: "text",
                    width: 150
                },
                {
                    title: 'Created by',
                    name: "createdBy",
                    type: "number",
                    width: 50
                },
                {
                    title: 'Created',
                    name: "dtCreated",
                    type: "date",
                    width: 200
                },
                {
                    title: 'Menu',
                    type: "control",
                    cellRenderer: function(value, item) {
                        return '<td class="jsgrid-cell jsgrid-control-field jsgrid-align-center" style="width: 50px;">' +
                                    '<input class="jsgrid-button jsgrid-edit-button edit-segment" data-segment-id="'+item.id + '" type="button" title="Edit">' +
                                    '<input class="jsgrid-button jsgrid-delete-button delete-segment" data-segment-id="'+item.id + '" type="button" title="Delete">' +
                                '</td>';
                    }
                }
            ]
        });

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
    },

    deleteSegment: function(ev) {
        var me = this,
            segmentId = $(ev.currentTarget).data('segment-id'),
            segmentModel = new Tds.Models.Segment({id: segmentId});

        segmentModel.destroy({
            url: 'segment/' + segmentId,
            success: function(model, response) {
                this.$('#tds-list').jsGrid('loadData');
            }
        });
    }
});