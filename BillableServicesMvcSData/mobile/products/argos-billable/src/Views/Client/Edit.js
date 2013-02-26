define('Mobile/BillableServices/Views/Client/Edit', [
    'dojo/_base/declare',
    'dojo/string',
    '../../Format',
    '../../Validator',
    'Sage/Platform/Mobile/Edit',
    'Sage/Platform/Mobile/_SDataEditMixin'
], function(
    declare,
    string,
    format,
    validator,
    Edit,
    _SDataEditMixin
) {

    return declare('Mobile.BillableServices.Views.Client.Edit', [Edit, _SDataEditMixin], {
        //Localization
        titleText: 'Edit Client',
        customerNameText: 'Name',
        streetAddressText: 'Street',
        cityText: 'City',
        stateProvinceText: 'State',
        postalCodeText: 'ZIP',

        //View Properties
        entityName: 'Customer',
        id: 'client_edit',
        insertSecurity: 'Entities/Customer/Add',
        updateSecurity: 'Entities/Customer/Edit',
        querySelect: [
            'CustomerName',
            'StreetAddress',
            'City',
            'StateProvince',
            'PostalCode'
        ],
        resourceKind: 'customers',

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: false,
                name: 'ClientDetailSection',
                cls: 'no-padding',
                children: [{
                    name: 'CustomerName',
                    property: 'CustomerName',
                    label: this.customerNameText,
                    type: 'text',
                    validator: validator.hasText
                },{
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
                    type: 'text'
                }]
            }]);
        }
    });
});