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