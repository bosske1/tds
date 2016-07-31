Tds.Router = Backbone.Router.extend({

    routes: {
        ''              : 'dashboard',
        'dashboard'     : 'dashboard',

        'tds/list'       : 'tdsList',
        'tds/create'     : 'tdsCreate',
        'tds/edit/:id'   : 'tdsEdit'
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

        tdsView.afterRender();
    },

    tdsEdit   : function(id){
        var me = this,
            tdsView  = new Tds.Views.Tds(),
            tdsModel = new Tds.Models.Tds();

        tdsModel.fetch({
            url: '/tds/read/' + id,
            success: function (model, response, options) {
                tdsView.setIsEditView(true)
                       .setModel(model)
                       .setTdsId(id);

                Tds.renderView(tdsView);
            },
            error: function (collection, response, options) {

                //create error handler...
            }
        });
    }



});