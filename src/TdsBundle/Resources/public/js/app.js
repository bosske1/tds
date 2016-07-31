window.Tds = {
    Models      : {},
    Collections : {},
    Views       : {},
    Services    : {},
    Helpers     : {},
    Parsers     : {},

    getParser: function(key){
        return this.Parsers[key];
    },

    getService: function(key){
        return this.Services[key];
    },

    getHelper: function(key){
        return this.Helpers[key];
    },

    start: function(data) {
        var router = new Tds.Router();

        Backbone.history.start();
    },

    getContainer : function(){
        return $('#main-container');
    },

    //probably not perfect place for this... for now it's ok...
    renderView : function(view){
        Tds.getContainer().html(view.render().$el);

        if (typeof view.afterRender != "undefined") {
            view.afterRender();
        }

        this.fixContainerLayout();
    },

    fixContainerLayout : function () {
        var navBarHeight = $('.side-nav').height();

        this.getContainer().css({
            height : navBarHeight - 20
        })
    }
};