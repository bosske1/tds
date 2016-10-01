Tds.Models.OrganizationUnit = Backbone.Model.extend({

    url: '/organizationunit',

    defaults: {
        id:   null,
        created_by: null,
        dt_created: null,
        modified_by: null,
        dt_modified: null,
        name: null
    },

    initialize: function() {

    }
});