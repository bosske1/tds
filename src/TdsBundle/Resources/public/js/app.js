window.Tds = {
    Models      : {},
    Collections : {},
    Views       : {},
    Services    : {},
    Helpers     : {},

    start: function(data) {
        var router = new Tds.Router();

        Backbone.history.start();
    }
};