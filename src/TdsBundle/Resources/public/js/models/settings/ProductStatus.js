/**
 * Created by bojanic on 22.9.16..
 */
Tds.Models.ProductStatus = Backbone.Model.extend({

    url : '/productStatus',

    defaults: {
        id          :   null,
        name	    :   null,
        created     :   null,
        created_by  :   null,
        html        :   ''
    },

    initialize: function() {

    }
});