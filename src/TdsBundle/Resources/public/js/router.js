Tds.Router = Backbone.Router.extend({

    routes: {
        ''              : 'dashboard',
        'dashboard'     : 'dashboard',

        'settings/segments'     : 'setSegments',
        'settings/trademarks'   : 'setTrademarks',
        'settings/prefixes'     : 'setPrefixes',
        'settings/lang'         : 'setLang',
        'settings/labels'       : 'setLabels',
        'settings/units'        : 'setUnits',

        'templates'     : 'templates',
        'translate'     : 'translate',

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
        var tdsView = new Tds.Views.Tds(),
            tdsModel = new Tds.Models.Tds();

        tdsView.setModel(tdsModel);

        Tds.renderView(tdsView);
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
    },

    setSegments : function() {
        var setSegmentsView = new Tds.Views.SetSegments();

        $('#main-container').html(setSegmentsView.render().$el);
    },

    setTrademarks : function() {
        var setTrademarksView = new Tds.Views.SetTrademarks();

        $('#main-container').html(setTrademarksView.render().$el);
    },

    setPrefixes : function() {
        var setPrefixesView = new Tds.Views.SetPrefixes();

        $('#main-container').html(setPrefixesView.render().$el);
    },

    setLang : function() {
        var setLangView = new Tds.Views.SetLang();

        $('#main-container').html(setLangView.render().$el);
    },

    setLabels: function() {
        var setLabelsView = new Tds.Views.SetLabels();

        $('#main-container').html(setLabelsView.render().$el);
    },

    setUnits : function() {
        var setUnitsView = new Tds.Views.SetUnits();

        $('#main-container').html(setUnitsView.render().$el);
    },

    templates : function() {
        var templatesView = new Tds.Views.Templates();

        $('#main-container').html(templatesView.render().$el);
    },

    translate : function() {
        var translateView = new Tds.Views.Translate();

        $('#main-container').html(translateView.render().$el);
    }
});