Tds.Router = Backbone.Router.extend({

    routes: {
        ''              : 'dashboard',
        'dashboard'     : 'dashboard',

        'settings/segments'         : 'segmentList',
        'settings/segment/edit/:id' : 'editSegment',

        'settings/productStatuses'  : 'setProductStatuses',
        'settings/trademarks'       : 'setTrademarks',
        'settings/prefixes'         : 'setPrefixes',
        'settings/lang'             : 'languageList',
        'settings/labels'           : 'setLabels',
        'settings/units'            : 'setUnits',

        'templates'     : 'templates',
        'translate'     : 'translate',

        'tds/list'       : 'tdsList',
        'tds/create'     : 'tdsCreate',
        'tds/edit/:id'   : 'tdsEdit',
        'tds/filter/add' : 'tdsFilterAdd'
    },

    initialize: function() {
        var navigationView = new Tds.Views.Navigation();

        $('#nav-container').html(navigationView.render().$el);
    },

    dashboard: function() {
        var dashboardView = new Tds.Views.Dashboard();

        $('#main-container').html(dashboardView.render().$el);
    },

    tdsList: function() {
        var tdsListView = new Tds.Views.TdsList();

        Tds.renderView(tdsListView);
    },

    tdsCreate: function() {
        var tdsView = new Tds.Views.Tds(),
            tdsModel = new Tds.Models.Tds();
        
        //defaults for now like this, until we figure out form where defaults come from...
        tdsModel.set('data', [{x: 0, y: 0, width: 12, height: 4}]);
        tdsView.setModel(tdsModel);

        Tds.renderView(tdsView);
    },

    tdsEdit: function(id) {
        var me = this,
            tdsView  = new Tds.Views.Tds(),
            tdsModel = new Tds.Models.Tds();

        tdsModel.fetch({
            url: '/tds/' + id,
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

    segmentList: function() {
        var segmentListView = new Tds.Views.SegmentList();

        Tds.renderView(segmentListView);
    },

    editSegment: function (id) {

    },

    setProductStatuses: function() {
        var setProductStatusesView = new Tds.Views.SetProductStatuses();

        Tds.renderView(setProductStatusesView);
    },

    setTrademarks: function() {
        var setTrademarksView = new Tds.Views.SetTrademarks();

        Tds.renderView(setTrademarksView);
    },

    setPrefixes: function() {
        var setPrefixesView = new Tds.Views.SetPrefixes();

        Tds.renderView(setPrefixesView);
    },

    languageList: function() {
        var languageListView = new Tds.Views.LanguageList();

        Tds.renderView(languageListView);
    },

    setLabels: function() {
        var setLabelsView = new Tds.Views.SetLabels();

        Tds.renderView(setLabelsView);
    },

    setUnits: function() {
        var setUnitsView = new Tds.Views.SetUnits();

        Tds.renderView(setUnitsView);
    },

    templates: function() {
        var templatesView = new Tds.Views.Templates();

        Tds.renderView(templatesView);
    },

    translate : function() {
        var translateView = new Tds.Views.Translate();

        Tds.renderView(translateView);
    },

    tdsFilterAdd: function() {
        var filterModel = new Tds.Models.Filter(),
            filterAddView = new Tds.Views.FilterAdd({ model : filterModel });

        Tds.renderView(filterAddView);
    }
});