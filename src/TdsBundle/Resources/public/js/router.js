Tds.Router = Backbone.Router.extend({

    routes: {
        ''         : 'dashboard',
        'dashboard': 'dashboard'
    },

    initialize: function() {
        console.log('router initialized');
    },

    dashboard : function(){
        var dashboardView = new Tds.Views.Dashboard();

        $('#main-container').html(dashboardView.render().$el);
    }

});