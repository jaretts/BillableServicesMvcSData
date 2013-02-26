define('Mobile/BillableServices/Views/Contact/Edit', [
    'dojo/_base/declare',
    'dojo/string',
    '../../Format',
    '../../Validator',
    'Sage/Platform/Mobile/Edit',
    'Sage/Platform/Mobile/_SDataEditMixin',
    'argos!application'
], function(
    declare,
    string,
    format,
    validator,
    Edit,
    _SDataEditMixin,
    application
) {

    return declare('Mobile.BillableServices.Views.Contact.Edit', [Edit, _SDataEditMixin], {
        //Localization
        titleText: 'Edit Contact',
        contactNameText: 'Name',
        contactTitleText: 'Title',
        emailAddressText: 'Email',
        officePhoneText: 'Office Phone',
        cellPhoneText: 'Mobile Phone',
        homePhoneText: 'Home Phone',
        officeEmailAddressText: 'Primary Email',
        personalEmailAddressText: 'Other Email',

        //View Properties
        id: 'contact_edit',
        insertSecurity: 'Entities/Contact/Add',
        updateSecurity: 'Entities/Contact/Edit',
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
        resourceKind: 'contacts',

        applyContext: function() {
            var clientContext = application().isNavigationFromResourceKind('customers'),
                key = clientContext && clientContext['id'];

            if (key)
                this.fields['CustomerID'].setValue(parseInt(key, 10));
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: false,
                cls: 'edit-inner',
                children: [{
                    name: 'ContactName',
                    property: 'ContactName',
                    label: this.contactNameText,
                    type: 'text',
                    validator: validator.hasText
                },{
                    name: 'ContactTitle',
                    property: 'ContactTitle',
                    label: this.contactTitleText,
                    type: 'text'
                },{
                    name: 'CustomerID',
                    property: 'CustomerID',
                    type: 'valueOnly'
                }]
            },{
                title: false,
                cls: 'edit-inner',
                children: [{
                    name: 'OfficePhone',
                    property: 'OfficePhone',
                    label: this.officePhoneText,
                    type: 'text',
                    inputType: 'phone',
                    maxTextLength: 32,
                    validator: validator.exceedsMaxTextLength
                },{
                    name: 'CellPhone',
                    property: 'CellPhone',
                    label: this.cellPhoneText,
                    type: 'text',
                    inputType: 'phone',
                    maxTextLength: 32,
                    validator: validator.exceedsMaxTextLength
                },{
                    name: 'HomePhone',
                    property: 'HomePhone',
                    label: this.homePhoneText,
                    type: 'text',
                    inputType: 'phone',
                    maxTextLength: 32,
                    validator: validator.exceedsMaxTextLength
                }]
            },{
                title: false,
                cls: 'edit-inner',
                children: [{
                    name: 'OfficeEmailAddress',
                    property: 'OfficeEmailAddress',
                    label: this.officeEmailAddressText,
                    type: 'text',
                    inputType: 'email',
                    validator: validator.exists
                },{
                    name: 'PersonalEmailAddress',
                    property: 'PersonalEmailAddress',
                    label: this.personalEmailAddressText,
                    type: 'text',
                    inputType: 'email'
                }]
            }]);
        }
    });
});