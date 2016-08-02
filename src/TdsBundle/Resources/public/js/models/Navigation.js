Tds.Models.Navigation = Backbone.Model.extend({

    url : '/navigation',

    defaults: {
        label       :   null,
        link        :   null,
        icon        :   null,
        active      :   null,
        visible	    :   null,
        children    :   []
    }
});