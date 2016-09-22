Tds.Collections.Segment = Backbone.Collection.extend({
    model   :   Tds.Models.Segment,
    url     :   '/segment',

    parse: function(data){
        return data['data'];
    }
});
