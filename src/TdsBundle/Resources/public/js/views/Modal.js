Tds.Views.Modal = Backbone.View.extend({
    title   : '&nbsp;',
    saveTitle: 'Save',
    closeTitle: 'Close',
    template: '#tpl-modal',
    modalId: '#modal',
    viewBodyId: '#view-body',
    mainContainer: null,

    initialize: function(options) {
        this.options = options;
        this.template = _.template($(this.template).html());

        if(!this.mainContainer) {
            return false;
        }
    },

    render: function (options) {
        var me = this,
            html = this.template({
                'modalTitle' : this.getTitle(),
                'saveTitle'  : this.getSaveTitle(),
                'closeTitle' : this.getCloseTitle()
            });

        this.$el.html(html);

        $(this.getMainContainer()).append(html);
        $(this.getBodyView()).append(this.getView().render().$el);

        if(this.saveTitle) {
            this.showSaveButton();
        } else {
            this.hideSaveButton();
        }

        return this;
    },

    setTitle : function (title) {
        this.title = title;

        return this;
    },

    getTitle : function () {
        return this.title;
    },

    setSaveTitle : function(saveTitle) {
        this.saveTitle = saveTitle;

        return this;
    },

    getSaveTitle : function() {
        return this.saveTitle;
    },

    setCloseTitle : function(closeTitle){
        this.closeTitle = closeTitle;

        return this;
    },

    getCloseTitle : function(){
        return this.closeTitle;
    },

    removeView: function(){
        $(this.modalId).remove();

        return this;
    },

    show: function() {
        this.removeView();
        this.render();

        $(this.modalId).modal('show');

        return false;
    },

    hide: function() {
        $(this.modalId).modal('hide');

        return this;
    },

    setView: function(view) {
        this.view = view;

        return this;
    },

    getView: function() {
        return this.view;
    },

    setMainContainer: function (container) {
        this.mainContainer = '#' + container;

        return this;
    },

    getMainContainer: function () {
        return this.mainContainer;
    },

    getBodyView: function() {
        return $(this.viewBodyId);
    },

    showSaveButton: function() {
        var me = this;

        $('#saveBtn')
            .show()
            .bind('click', function() {
                me.onViewSave();
            });
    },

    hideSaveButton: function() {
        $('#saveBtn')
            .hide()
            .unbind();
    },

    onViewSave : function() {
        this.getView().trigger('saveEvent');
    }
});