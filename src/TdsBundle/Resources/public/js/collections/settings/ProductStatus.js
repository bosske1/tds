/**
 * Created by bojanic on 22.9.16..
 */
Tds.Collections.ProductStatus = Backbone.Collection.extend({
    model   :   Tds.Models.ProductStatus,
    url     :   '/productStatus',

    parse: function(data){
        return data['data'];
    }
});