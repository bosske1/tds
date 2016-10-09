Tds.Router = Backbone.Router.extend({

    routes: {
        ''              : 'dashboard',
        'dashboard'     : 'dashboard',

        'settings/segments'         : 'segmentList',
        'settings/segment/edit/:id' : 'editSegment',

        'settings/productStatuses'  : 'setProductStatuses',
        'settings/productStatus/edit/:id' : 'editProductStatus',

        'settings/trademarks'       : 'setTrademarks',
        'settings/prefixes'         : 'setPrefixes',
        'settings/lang'             : 'setLang',
        'settings/labels'           : 'setLabels',
        'settings/units'            : 'setUnits',

        'templates'     : 'templateList',
        'translate'     : 'translate',

        'tds/create'     : 'tdsCreate',
        'tds/edit/:id'   : 'tdsEdit',

        'tds/filter/add' : 'tdsFilterAdd',
        'tds/filter/:id' : 'tdsFilter',

        'template/create'   : 'templateCreate',
        'template/edit/:id' : 'templateEdit'
    },

    initialize: function() {
        var navigationView = new Tds.Views.Navigation();

        $('#nav-container').html(navigationView.render().$el);
    },

    dashboard: function() {
        var dashboardView = new Tds.Views.Dashboard();

        $('#main-container').html(dashboardView.render().$el);
    },

    tdsCreate: function() {
        var tdsView = new Tds.Views.Tds(),
            tdsModel = new Tds.Models.Tds();

        tdsModel.fetch({
            url: '/template/fetchTemplateBasedOnUser',
            success: function (templateModel, response, options) {

                //assign data from template
                var tdsModel = new Tds.Models.Tds({
                    'data' : templateModel.get('data'),
                    'isTemplate' : 0
                });

                tdsView.setModel(tdsModel);
                Tds.renderView(tdsView);
            },
            error: function (collection, response, options) {
                alert('cannot find predefined template');
                //create error handler...
            }
        });
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

    //copy-paste until i figure out is it really a TDS
    templateCreate : function(){
        var tdsView = new Tds.Views.Tds(),
            tdsModel = new Tds.Models.Tds();

        tdsModel.set('isTemplate', 1);
        tdsView.setModel(tdsModel);

        Tds.renderView(tdsView);
    },

    //copy-paste until i figure out is it really a TDS
    templateEdit : function(id){
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

    editProductStatus: function(id){

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

    setLang: function() {
        var setLangView = new Tds.Views.SetLang();

        Tds.renderView(setLangView);
    },

    setLabels: function() {
        var setLabelsView = new Tds.Views.SetLabels();

        Tds.renderView(setLabelsView);
    },

    setUnits: function() {
        var setUnitsView = new Tds.Views.SetUnits();

        Tds.renderView(setUnitsView);
    },

    templateList: function() {
        var templateListView = new Tds.Views.TemplateList();

        Tds.renderView(templateListView);
    },

    translate : function() {
        var translateView = new Tds.Views.Translate();

        Tds.renderView(translateView);
    },

    /**
     * basically show filters and search by them, but also add 'Add' button
     */
    tdsFilterAdd: function() {
        var filterModel = new Tds.Models.Filter(),
            tdsListView = new Tds.Views.TdsList({ filterModel : filterModel });

        Tds.renderView(tdsListView);
    },

    tdsFilter: function(id) {
        var me = this,
            tdsFilterModel = new Tds.Models.Filter();

        tdsFilterModel.fetch({
            url: '/filter/' + id,
            success: function (filterModel, response, options) {
                var tdsListView  = new Tds.Views.TdsList({ filterModel : filterModel });

                tdsListView.setFilters(filterModel.get('data'));
                Tds.renderView(tdsListView);

                tdsListView.fillFilterView(filterModel)
                           .fillTable();
            },
            error: function (collection, response, options) {

                //create error handler...
            }
        });
    }
});