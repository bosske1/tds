Tds.Collections.OrganizationUnit = Backbone.Collection.extend({
    model: Tds.Models.OrganizationUnit,
    url: '/organizationunit',

    parse: function(data) {
        return data['data'];
    }
});
