Tds.Models.Language = Backbone.Model.extend({

    url : '/language',

    defaults: {
        id: null,
        createdBy: null,
        dtCreated: null,
        modifiedBy: null,
        dtModified: null,
        lang: null,
        organizationUnitId: null,
        organizationUnitName: null
    },

    initialize: function() {

    }
});