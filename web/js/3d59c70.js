window.Tds = {
    Models      : {},
    Collections : {},
    Views       : {},
    Services    : {},
    Helpers     : {},
    Parsers     : {},

    start: function(data) {
        var router = new Tds.Router();

        Backbone.history.start();
    }
};
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

        tdsView.afterRender();
    },

    tdsEdit   : function(id){
        var tdsView = new Tds.Views.Tds();

        tdsView.setIsEditView(true)
               .setTdsId(id);

        $('#main-container').html(tdsView.render().$el);
    }



});
Tds.Views.Dashboard = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-dashboard').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});
Tds.Views.Tds = Backbone.View.extend({

    isEditView : false,

    tdsId : null,

    initialize: function() {
        this.template= _.template($('#tpl-tds').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        if(this.getIsEditView()){
            this.$el.append('Editing TDS with id ' + this.getTdsId());
        }

        return this;
    },

    afterRender: function(){
        var options = {
            cellHeight: 80,
            verticalMargin: 10
        };

        $('.grid-stack').gridstack(options);
    },

    setTdsId : function(tdsId){
        this.tdsId = tdsId;
    },

    getTdsId : function(){
        return this.tdsId;
    },

    setIsEditView : function(isEditView){
        this.isEditView = isEditView;

        return this;
    },

    getIsEditView : function(){
        return this.isEditView;
    }

});
Tds.Views.TdsList = Backbone.View.extend({

    initialize: function() {
        this.template= _.template($('#tpl-tds-list').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        return this;
    }
});