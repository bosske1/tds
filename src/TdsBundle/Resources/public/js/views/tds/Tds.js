Tds.Views.Tds = Backbone.View.extend({

    isEditView : false,

    tdsId : null,

    events: {
        'click #save-button': 'saveTemplate',
        'click #load-button': 'loadTemplate'
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
        var parsedData = Tds.getParser('TdsHtmlToJson').setContainer(this.getGridStackContainer()).parse();

        console.log(parsedData);
    },

    loadTemplate : function(){
        Tds.getParser('TdsJsonToHtml').prepareGridStack();

        this.getGridStackContainer().gridstack({});

        var dataToParse = [
            {x: 0, y: 0, width: 2, height: 2},
            {x: 3, y: 1, width: 1, height: 2},
            {x: 4, y: 1, width: 1, height: 1},
            {x: 2, y: 3, width: 3, height: 1},
            {x: 1, y: 4, width: 1, height: 1},
            {x: 1, y: 3, width: 1, height: 1},
            {x: 2, y: 4, width: 1, height: 1},
            {x: 2, y: 5, width: 1, height: 1}
        ];

        Tds.getParser('TdsJsonToHtml').setContainer(this.getGridStackContainer()).parse(dataToParse);
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