Tds.Models.Segment = Backbone.Model.extend({

    url : '/segment',

    defaults: {
        id: null,
        created_by: null,
        dt_created: null,
        modified_by: null,
        dt_modified: null,
        name: null,
        organization_unit_id: null,
        organization_unit_name: null
    },

    initialize: function() {

    }
});