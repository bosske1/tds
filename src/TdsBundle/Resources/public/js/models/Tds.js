Tds.Models.Tds = Backbone.Model.extend({

    url : '/tds',

    defaults: {
        id          :   null,
        created_by  :   null,
        td_created  :   null,
        name	    :   null,
        data        :   []
    },

    initialize: function() {

    }
});