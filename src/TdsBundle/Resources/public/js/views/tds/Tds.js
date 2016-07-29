Tds.Views.Tds = Backbone.View.extend({

    isEditView : false,

    tdsId : null,

    events: {
        'click #save-button': 'saveTemplate'
    },

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
        $.fn.size = function(){
            return this.length;
        };
        var options = {
            cellHeight: 80,
            verticalMargin: 10
        };

        this.getGridStackContainer().gridstack(options);
    },

    saveTemplate : function(){
        Tds.getParser('TdsHtmlToJson').setContainer(this.getGridStackContainer()).parse()
    },

    loadTemplate : function(){
        Tds.getParser('TdsJsonToHtml').setContainer(this.getGridStackContainer()).parse()
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
    },

    getGridStackContainer : function(){
        return $('.grid-stack')
    }

});