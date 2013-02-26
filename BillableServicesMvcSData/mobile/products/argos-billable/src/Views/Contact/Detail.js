define('Mobile/BillableServices/Views/Contact/Detail', [
    'dojo/_base/declare',
    'dojo/dom-attr',
    'dojo/string',
    '../../Format',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Environment',
    'Sage/Platform/Mobile/Detail',
    'Sage/Platform/Mobile/_SDataDetailMixin'
], function(
    declare,
    domAttr,
    string,
    format,
    util,
    environment,
    Detail,
    _SDataDetailMixin
) {

    return declare('Mobile.BillableServices.Views.Contact.Detail', [Detail, _SDataDetailMixin], {
        //Localization
        titleText: 'Contact',
        officeEmailAddressText: 'email primary',
        personalEmailAddressText: 'email other',
        officePhoneText: 'call office',
        cellPhoneText: 'call mobile',
        homePhoneText: 'call home',

        actionItemTemplate: new Simplate([
            '<a data-action="{%= $.action %}" data-property="{%= $.property %}" {% if ($.disabled) { %}data-disable-action="true"{% } %} class="{% if ($.disabled) { %}is-disabled{% } %}">',
            '<h4>{%: $.label %}</h4>',
            '<h3>{%= $.formatted %}</h3>',
            '{% if ($.icon) { %}',
            '<img src="{%= $.icon %}" alt="icon" class="icon" />',
            '{% } %}',
            '</a>'
        ]),

        //View Properties
        id: 'contact_detail',
        editView: 'contact_edit',
        security: 'Entities/Contact/View',
        querySelect: [
            'CustomerID',
            'ContactName',
            'ContactTitle',
            'OfficeEmailAddress',
            'PersonalEmailAddress',
            'OfficePhone',
            'CellPhone',
            'HomePhone'
        ],
        tier: 0,
        resourceKind: 'contacts',

        noValue: function(item, val) {
            return !val;
        },
        callPhone: function(evt, node) {
            var prop = domAttr.get(node, 'data-property'),
                value = util.getValue(this.item, prop);

            if (value)
                environment.initiateCall(value);
        },
        sendEmail: function(evt, node) {
            var prop = domAttr.get(node, 'data-property'),
                value = util.getValue(this.item, prop);

            if (value)
                environment.initiateEmail(value);
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: false,
                name: 'HeaderSection',
                cls: 'contact-header',
                children: [{
                    name: 'ContactName',
                    property: 'ContactName'
                }]
            },{
                title: false,
                list: true,
                name: 'PhonesSection',
                cls: 'detail-inner',
                children: [{
                    name: 'OfficePhone',
                    property: 'OfficePhone',
                    action: 'callPhone',
                    //icon: 'content/images/icons/call.png',
                    label: this.officePhoneText,
                    disabled: this.noValue,
                    renderer: format.phone.bindDelegate(this, false)
                },{
                    name: 'CellPhone',
                    property: 'CellPhone',
                    action: 'callPhone',
                    //icon: 'content/images/icons/call.png',
                    label: this.cellPhoneText,
                    disabled: this.noValue,
                    renderer: format.phone.bindDelegate(this, false)
                },{
                    name: 'HomePhone',
                    property: 'HomePhone',
                    action: 'callPhone',
                    //icon: 'content/images/icons/call.png',
                    label: this.homePhoneText,
                    disabled: this.noValue,
                    renderer: format.phone.bindDelegate(this, false)
                }]
            },{
                title: false,
                list: true,
                name: 'EmailsSection',
                cls: 'detail-inner',
                children: [{
                    name: 'OfficeEmailAddress',
                    property: 'OfficeEmailAddress',
                    action: 'sendEmail',
                    disabled: this.noValue,
                    //icon: 'content/images/icons/email.png',
                    label: this.officeEmailAddressText
                },{
                    name: 'PersonalEmailAddress',
                    property: 'PersonalEmailAddress',
                    action: 'sendEmail',
                    disabled: this.noValue,
                    //icon: 'content/images/icons/email.png',
                    label: this.personalEmailAddressText
                }]
            }]);
        }
    });
});