Tds.Router = Backbone.Router.extend({

    routes: {
        ''              : 'dashboard',
        'dashboard'     : 'dashboard',

        'tdsList'       : 'tdsList',
        'tdsCreate'     : 'tdsCreate',
        'tdsEdit/:id'   : 'tdsEdit'
    },

    initialize: function() {

    },

    dashboard : function(){
        var dashboardView = new Tds.Views.Dashboard();

        $('#main-container').html(dashboardView.render().$el);
    },

    tdsList : function(){
        var tdsListView = new Tds.Views.TdsList();

        $('#main-container').html(tdsListView.render().$el);
    },

    tdsCreate : function(){
        var tdsView = new Tds.Views.Tds();

        $('#main-container').html(tdsView.render().$el);
    },

    tdsEdit   : function(id){
        var tdsView = new Tds.Views.Tds();

        tdsView.setIsEditView(true)
               .setTdsId(id);

        $('#main-container').html(tdsView.render().$el);
    }



});