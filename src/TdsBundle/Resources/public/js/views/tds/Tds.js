Tds.Views.Tds = Backbone.View.extend({

    isEditView : false,

    tdsId : null,

    model : null,

    fullWidgetWidth : 12,
    halfWidgetWidth : 6,

    widgetHeight    : 4,

    events: {
        'click #save-button'    : 'saveTemplate',
        'click #generate-button': 'generateTemplate',
        'click #add-widget-button'              : 'addWidget',
        'click #add-half-widget-button'         : 'addHalfWidget',
        'mousedown .grid-stack-item-content'    : 'removeWidget', //middle mouse click
        'dblclick .grid-stack-item-content'     : 'showEditorModal'
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
        var me = this,
            parsedData = Tds.getParser('TdsHtmlToJson').setContainer(this.getGridStackContainer()).parse();

        this.getModel().set('data', parsedData);
        this.getModel().set('isTemplate', 0);
        this.getModel().save({
            success: function (model, response, options) {

                //do something...
            },
            error: function (collection, response, options) {

                //create error handler...
            }
        },
        {url: me.getSaveUrl()});
    },

    generateTemplate :function () {
        var me = this,
            parsedData = Tds.getParser('TdsHtmlToJson').setContainer(this.getGridStackContainer()).parse();

        this.getModel().set('data', parsedData);
        this.getModel().save({
                success: function (model, response, options) {

                    //do something...
                },
                error: function (collection, response, options) {

                    //create error handler...
                }
            });
    },

    loadTemplate : function(){
        Tds.getParser('TdsJsonToHtml').prepareGridStack();

        var dataToParse = this.getModel().get('data');

        this.getGridStackContainer().gridstack({});

        Tds.getParser('TdsJsonToHtml').setContainer(this.getGridStackContainer()).parse(dataToParse);
    },

    getSaveUrl : function () {
        if(this.getIsEditView() && this.getTdsId() != null){
            return '/tds/' + this.getTdsId();
        } else {
            return '/tds';
        }
    },

    getGenerateUrl : function () {
        return '/tds/generate';
    },

    showEditorModal : function (e) {
        $('#editor-modal').modal('show');

        this.showEditor(e);
        this.onEditorSave(e);
    },

    onEditorSave : function (e) {
        $( "#editor-modal-button-save" ).unbind().on( "click", function() {
            //set new html markup to container from editor
            $(e.currentTarget).html(tinymce.activeEditor.getContent());

            //reset editor content
            tinymce.activeEditor.setContent('');

            $('#editor-modal').modal('hide');
        });
    },

    showEditor : function (e) {
        tinymce.remove("#editor-modal-body");

        tinymce.init({
            selector: '#editor-modal-body',
            setup : function(ed) {
                ed.on('init', function(args) {
                    tinymce.activeEditor.setContent('');
                    tinymce.activeEditor.setContent($(e.currentTarget).html());
                });
            }
        });
    },

    addWidget : function () {
        var grid = this.getGridStackContainer().data('gridstack');

        grid.addWidget($('<div data-gs-no-resize="true"><div class="grid-stack-item-content" /><div/>'),
            0, 0, this.fullWidgetWidth, this.widgetHeight);
    },

    addHalfWidget : function () {
        var grid = this.getGridStackContainer().data('gridstack');

        grid.addWidget($('<div data-gs-no-resize="true"><div class="grid-stack-item-content" /><div/>'),
            0, 0, this.halfWidgetWidth, this.widgetHeight);
    },

    removeWidget : function (e) {
        var grid = this.getGridStackContainer().data('gridstack');

        if(e.button != 1) {
            return false;
        }

        grid.removeWidget($(e.currentTarget).parent());
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