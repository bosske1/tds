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