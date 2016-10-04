Tds.Helpers.View = {

    mainContainer: 'main-container',

    getMainContainerDiv: function() {
        return $('#' + this.mainContainer);
    },

    setView : function(view) {
        this.view = view;
        return this;
    },

    getView : function() {
        return this.view;
    },

    checkMandatoryFields: function(containerId) {
        var me = this;
        var mandatoryFields = $('#' + containerId).find('.mandatory'),
            areMandatoryFieldsFilled = true;

        _.each(mandatoryFields, function(field) {
            //skip ones without id, IE issue
            if($(field).prop('id') == ''){
                return true;
            }

            //reset background if exist
            me.removeBackgroundColor(field);
            var container = $(field).closest('.form-group');

            var fieldType = me.getFieldType(field);

            if ($(container).is(":visible")) {
                switch(fieldType) {
                    case 'checkbox' :
                        if(
                            !$(field).is(':checked')
                            && $(field).prop('disabled') == false
                            && $(field).css('visibility') == 'visible'
                            && ($(field).css('display') != 'none' || fieldType == 'select'))
                        {
                            me.setBackgroundColor(field);
                            areMandatoryFieldsFilled = false;
                        }
                        break;
                    default:
                        if(($(field).val() == null || $(field).val() == '')
                            && $(field).prop('disabled') == false
                            && $(field).css('visibility') == 'visible'
                            && ($(field).css('display') != 'none' || fieldType == 'select'))
                        {
                            me.setBackgroundColor(field);
                            areMandatoryFieldsFilled = false;
                        }
                        break;
                }
            }
        });

        return areMandatoryFieldsFilled;
    },

    setBackgroundColor : function(fieldElement, color) {
        var fieldType = this.getFieldType(fieldElement);
        var fieldId   = $(fieldElement).attr('id');

        switch(fieldType) {
            case 'select':
                var fieldName = $(fieldElement).attr('name');
                $("button[data-id='" + fieldName + "']").css({ 'background': 'rgb(247, 166, 166)' });
                $("button[data-id='" + fieldId + "']").css({ 'background': 'rgb(247, 166, 166)' });
                break;
            case 'checkbox':
                $(fieldElement).css({ 'border': 'solid 1px #FF0000' });
                var theLabel = $('label[for="' + fieldId + '"]');
                if(typeof theLabel != 'undefined'){
                    $(theLabel).css({ 'border': 'solid 1px #FF0000' });
                }
                break;
            case 'date':
            case 'datetime':
            default :
                $(fieldElement).css({ 'background': 'rgb(247, 166, 166)' });
                break;
        }
    },

    removeBackgroundColor : function(fieldElement) {
        var fieldType = this.getFieldType(fieldElement);
        var fieldId   = $(fieldElement).attr('id');

        switch(fieldType) {
            case 'select':
                var fieldName = $(fieldElement).attr('name');
                $("button[data-id='" + fieldName + "']").css({ 'background': '' });
                $("button[data-id='" + fieldId + "']").css({ 'background': '' });
                break;
            case 'checkbox':
                $(fieldElement).css({ 'border': '1px solid #dadada' });
                var theLabel = $('label[for="' + fieldId + '"]');
                if(typeof theLabel != 'undefined'){
                    $(theLabel).css({ 'border': '1px solid #dadada' });
                }
                break;
            case 'date':
            case 'datetime':
            default :
                $(fieldElement).css({ 'background': '' });
                break;
        }
    },

    getFieldType: function(fieldElement) {
        var fieldType = $(fieldElement).attr('type');

        return fieldType;
    },

    populateSelect: function(selectFieldId, collection, selectedValue) {
        var selectField = this.getView().$('#' + selectFieldId);
        selectField = this.getView().$(selectField.get(0));

        selectField.find('option').remove();

        var option = $("<option></option>").text('---').val('');
        option.appendTo(selectField);

        $.each(collection.models, function(index, item) {
            if(selectedValue == item.get('id')) {
                var option = $("<option selected></option>").text(item.get('name')).val(item.get('id'));
            } else {
                var option = $("<option></option>").text(item.get('name')).val(item.get('id'));
            }

            option.appendTo(selectField);
        });

        return this;
    }
};