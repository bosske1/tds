Tds.Collections.Language = Backbone.Collection.extend({
    model   :   Tds.Models.Language,
    url     :   '/language',

    parse: function(data) {
        return data['data'];
    }
});
