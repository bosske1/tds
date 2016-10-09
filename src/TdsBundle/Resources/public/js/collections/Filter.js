Tds.Collections.Filter = Backbone.Collection.extend({
    model   :   Tds.Models.Filter,
    url     :   '/filter',

    parse: function(data){
        return data['data'];
    }
});
