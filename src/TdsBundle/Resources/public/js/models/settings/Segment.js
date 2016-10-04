Tds.Models.Segment = Backbone.Model.extend({

    url : '/segment',

    defaults: {
        id: null,
        createdBy: null,
        dtCreated: null,
        modifiedBy: null,
        dtModified: null,
        name: null,
        organizationUnitId: null,
        organizationUnitName: null
    },

    initialize: function() {

    }
});