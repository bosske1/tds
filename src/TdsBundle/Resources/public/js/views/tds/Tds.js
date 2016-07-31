Tds.Views.Tds = Backbone.View.extend({

    isEditView : false,

    tdsId : null,

    model : null,

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
        this.loadTemplate();
    },

    saveTemplate : function(){
        var parsedData = Tds.getParser('TdsHtmlToJson').setContainer(this.getGridStackContainer()).parse();

        console.log(parsedData);
    },

    loadTemplate : function(){
        Tds.getParser('TdsJsonToHtml').prepareGridStack();

        var dataToParse = this.getModel().get('data');

        this.getGridStackContainer().gridstack({});

        Tds.getParser('TdsJsonToHtml').setContainer(this.getGridStackContainer()).parse(dataToParse);
    },

    setTdsId : function(tdsId){
        this.tdsId = tdsId;
    },

    getTdsId : function(){
        return this.tdsId;
    },

    setModel : function(model){
        this.model = model;

        return this;
    },

    getModel : function(){
        return this.model;
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