Tds.Models.Segment = Backbone.Model.extend({

    url : '/segment',

    defaults: {
        id          :   null,
        name	    :   null,
        created     :   null,
        created_by  :   null
    },

    initialize: function() {

    }
});