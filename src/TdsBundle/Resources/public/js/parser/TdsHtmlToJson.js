Tds.Parsers.TdsHtmlToJson = {

    container : '',

    parse : function(){
        this.prepareGridStack();

        this.serializedData = _.map(this.getContainer().find('.grid-stack-item:visible'), function (el) {
            el = $(el);
            var node = el.data('_gridstack_node'),
                html = el.find('.grid-stack-item-content').html();

            return {
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                html  : html
            };
        }, this);

        return JSON.stringify(this.serializedData, null, '    ');
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