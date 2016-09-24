Tds.Models.Segment = Backbone.Model.extend({

    url : '/segment',

    defaults: {
        id          :   null,
        created_by  :   null,
        name        :   null,
        dt_created  :   null
    },

    initialize: function() {

    }
});