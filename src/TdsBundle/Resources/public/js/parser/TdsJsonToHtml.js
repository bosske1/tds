Tds.Parsers.TdsJsonToHtml = {

    container : '',

    parse : function(dataToParse){
        this.prepareGridStack();

        this.grid = this.getContainer().data('gridstack');

        this.grid.removeAll();
        var items = GridStackUI.Utils.sort(dataToParse);
        _.each(items, function (node) {
            this.grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
                node.x, node.y, node.width, node.height);
        }, this);
    },

    setContainer : function(container){
        this.container = container;

        return this;
    },

    getContainer : function(){
        return this.container;
    },

    prepareGridStack : function(){
        $.fn.size = function(){
            return this.length;
        };
    }

};