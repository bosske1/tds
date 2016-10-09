Tds.Views.Language = Backbone.View.extend({

    isEditView: false,

    languageId: null,

    model: null,

    toPostFormData: [
        'langId',
        'organizationUnitId'
    ],

    events: {

    },

    initialize: function() {
        this.template = _.template($('#tpl-language').html());
    },

    render: function() {
        var html = this.template({
            'model': this.getModel()
        });
        this.$el.html(html);

        this.postRender();

        return this;
    },

    afterRender: function() {
        this.initSelects();
    },

    initSelects: function() {
        var me = this;

        Tds.getService('CollectionDataContainer').clear('Langs').get('Langs', {
            success: function(collection, response) {
                if (collection) {
                    Tds.getHelper('View').setView(me).populateSelect('langId', collection, me.model.get('langId'));
                } else {
                    alert('Error fetching lang list');
                }
            }
        });

        Tds.getService('CollectionDataContainer').clear('OrganizationUnits').get('OrganizationUnits', {
            success: function(collection, response) {
                if (collection) {
                    Tds.getHelper('View').setView(me).populateSelect('organizationUnitId', collection, me.model.get('organizationUnitId'));
                } else {
                    alert('Error fetching organization units');
                }
            }
        });
    },

    bindEvents: function() {
        var me = this;

        this.off('saveEvent');
        this.on('saveEvent', this.onSave, this);

        return this;
    },

    postRender: function(view) {
        this.bindEvents();

        return this;
    },

    setLanguageId: function(languageId) {
        this.languageId = languageId;
    },

    getLanguageId: function() {
        return this.languageId;
    },

    setModel: function(model) {
        this.model = model;

        return this;
    },

    getModel: function() {
        return this.model;
    },

    setIsEditView: function(isEditView) {
        this.isEditView = isEditView;

        return this;
    },

    getIsEditView: function() {
        return this.isEditView;
    },

    getSaveUrl: function() {
        if(this.getIsEditView() && this.getLanguageId() != null){
            return '/language/' + this.getLanguageId();
        } else {
            return '/language';
        }
    },

    onSave: function () {
        var me = this,
            router = new Tds.Router(),
            language = this.getModel(),
            data = {};

        if(!Tds.getHelper('View').checkMandatoryFields('language-form')) {
            Tds.getView('Modal').showError('Check mandatory fields!');

            return false;
        }

        $.each(me.toPostFormData, function(index, item) {
            data[item] = $('#' + item).val();
        });

        language.set(data);
        language.save(null, {
            url: me.getSaveUrl(),
            success: function (model, response) {
                Tds.getView('Modal').hide();
                this.$('#language-list').jsGrid('loadData');
            },
            error: function (model, response) {
                Tds.getView('Modal').showError('Error occurred!');
            }
        });
    }
});