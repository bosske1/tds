Tds.Views.Navigation = Backbone.View.extend({

    initialize: function() {
        this.collection = new Tds.Collections.Navigation;
        this.template= _.template($('#tpl-navigation').html());
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);
        this.postrender();

        return this;
    },

    postrender: function() {
        this.getData();
    },

    getData: function() {
        var me = this;

        this.collection.fetch({
            success: function(collection, response) {
                _.each(collection.models, function(model) {
                    me.createNavMenu(model.toJSON().data);
                });
            }
        });

        return this;
    },

    createNavMenu: function(data) {
        var me = this;
        var menu = '';

        _.each(data, function(item) {
            menu += me.getListItem(item);
        });

        this.$('#nav-menu').append(menu);
    },

    getListItem: function(item) {
        var me = this;
        var element = '';

        if(_.isEmpty(item.children)) {
            element += '<li'+((item.active==true)?' class="active"':'')+'>';
            element += '<a href="#' + item.link + '">';

            if(item.icon) {
                element += me.getIconElement(item.icon);
            }

            element += item.label + '</a></li>';
        } else {
            element += '<li>';
            element += '<a href="javascript:;" data-toggle="collapse" data-target="#' + item.link + '">';
            element += me.getIconElement(item.icon);
            element += item.label;
            element += me.getIconElement('fa fa-fw fa-caret-down');
            element += '</a>';
            element += me.getListElement(item);
            element += '</li>';
        }

        return element;
    },

    getIconElement: function(icon) {
        return '<i class="' + icon + '"></i> ';
    },

    getListElement: function(item) {
        var me = this;
        var element = '<ul id="' + item.link + '" class="collapse">';

        _.each(item.children, function(child) {
            element += me.getListItem(child);
        });

        element += '</ul>';

        return element;
    }
});