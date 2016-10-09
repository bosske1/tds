Tds.Models.Filter = Backbone.Model.extend({

    url : '/filter',

    defaults: {
        id          :   null,
        created_by  :   null,
        dt_created  :   null,
        name	    :   null,
        data        :   {}
    },

    initialize: function() {

    }
});