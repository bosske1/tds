Tds.Parsers.TdsHtmlToJson = {

    container : '',

    parse : function(){
        alert('parse bre!')
    },

    setContainer : function(container){
        this.container = container;

        return this;
    },

    getContainer : function(){
        return this.container;
    }

};