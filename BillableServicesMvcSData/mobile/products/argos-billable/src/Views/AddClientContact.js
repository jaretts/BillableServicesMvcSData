define('Mobile/BillableServices/Views/AddClientContact', [
    'dojo/_base/declare',
    'dojo/string',
    '../Format',
    '../Validator',
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

    return declare('Mobile.BillableServices.Views.AddClientContact', [Edit, _SDataEditMixin], {
        //Localization
        titleText: 'New Client',
        firstNameText: 'First',
        lastNameText: 'Last',
        contactTitleText: 'Title',
        emailAddressText: 'Email',
        officePhoneText: 'Phone',
        officeEmailAddressText: 'Email',
        optionalText: '(optional)',
        customerNameText: 'Company',
        streetAddressText: 'Street',
        cityText: 'City',
        stateProvinceText: 'State',
        postalCodeText: 'ZIP',
        addressTitleText: 'Address (optional)',

        //View Properties
        insertSecurity: 'Entities/Customer/Add',
        updateSecurity: 'Entities/Customer/Edit',
        querySelect: [
            'CustomerName',
            'Contact/*'
        ],
        resourceKind: 'customers',

        getValues: function() {
            var values = this.inherited(arguments),
                user = application().context.user,
                contact = [{
                    ContactName: format.nameLF(values['LastName'], values['FirstName']),
                    ContactTitle: values['ContactTitle'] || '',
                    OfficeEmailAddress: values['OfficeEmailAddress'],
                    OfficePhone: values['OfficePhone'] || null,
                    TenantID: user['TenantID']
                }];
            delete values['FirstName'];
            delete values['LastName'];
            delete values['ContactTitle'];
            delete values['OfficeEmailAddress'];
            delete values['OfficePhone'];

            values['Contacts'] = contact;

            if (!values['CustomerName'])
                values['CustomerName'] = contact[0].ContactName;

            values['UserID'] = user['UserID'];
            values['TenantID'] = user['TenantID'];

            // todo: add option to select type?
            values['AccountType'] = 0;

            return values;
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: false,
                name: 'NameSection',
                cls: 'no-padding edit-inner',
                children: [{
                    name: 'FirstName',
                    property: 'FirstName',
                    label: this.firstNameText,
                    type: 'text',
                    validator: validator.hasText
                },{
                    name: 'LastName',
                    property: 'LastName',
                    label: this.lastNameText,
                    type: 'text'
                },{
                    name: 'ContactTitle',
                    property: 'ContactTitle',
                    label: this.contactTitleText,
                    type: 'text',
                    placeHolder: this.optionalText
                },{
                    name: 'CustomerName',
                    property: 'CustomerName',
                    label: this.customerNameText,
                    type: 'text',
                    placeHolder: this.optionalText
                }]
            },{
                title: false,
                name: 'ContactSection',
                cls: 'edit-inner',
                children: [{
                    name: 'OfficeEmailAddress',
                    property: 'OfficeEmailAddress',
                    label: this.officeEmailAddressText,
                    type: 'text',
                    inputType: 'email',
                    validator: validator.exists
                },{
                    name: 'OfficePhone',
                    property: 'OfficePhone',
                    label: this.officePhoneText,
                    type: 'text',
                    inputType: 'phone',
                    placeHolder: this.optionalText
                }]
            },{
                title: this.addressTitleText,
                name: 'AddressSection',
                cls: 'edit-inner',
                children: [{
                    name: 'StreetAddress',
                    property: 'StreetAddress',
                    label: this.streetAddressText,
                    type: 'text'
                },{
                    name: 'City',
                    property: 'City',
                    label: this.cityText,
                    type: 'text'
                },{
                    name: 'StateProvince',
                    property: 'StateProvince',
                    label: this.stateProvinceText,
                    type: 'text'
                },{
                    name: 'PostalCode',
                    property: 'PostalCode',
                    label: this.postalCodeText,
                    type: 'decimal',
                    precision: 0
                }]
            }]);
        }
    });
});