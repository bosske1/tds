Tds.Collections.Tds = Backbone.Collection.extend({
    model   :   Tds.Models.Tds,
    url     :   '/tds',

    parse: function(data){
        return data['data'];
    }
});
