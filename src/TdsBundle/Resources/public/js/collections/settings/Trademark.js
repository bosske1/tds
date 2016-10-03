Tds.Collections.Trademark = Backbone.Collection.extend({
    model   :   Tds.Models.Trademark,
    url     :   '/trademark',

    parse: function(data) {
        return data['data'];
    }
});
