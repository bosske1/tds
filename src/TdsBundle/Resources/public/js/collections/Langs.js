Tds.Collections.Langs = Backbone.Collection.extend({
    model: Tds.Models.Language,
    url: '/lang',

    parse: function(data) {
        return data['data'];
    }
});
