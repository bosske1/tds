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
    }
};