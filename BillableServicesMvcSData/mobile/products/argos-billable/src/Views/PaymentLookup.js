define('Mobile/BillableServices/Views/PaymentLookup', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/store/Memory',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    Memory,
    List
) {

    return declare('Mobile.BillableServices.Views.PaymentLookup', [List], {
        //Template
        itemTemplate: new Simplate([
            '<h3>{%: $.Name %}</h3>',
            '<h4>{%: $.Description %}</h4>'
        ]),

        //Localization
        titleText: 'Payment Method',
        accountNameText: 'Add to Account',
        accountDescriptionText: 'Charge is added to the accounting system',
        creditNameText: 'Credit Card',
        creditDescriptionText: 'Charge client by Credit Card now',
        cashNameText: 'Cash',
        cashDescriptionText: 'Charge client by Cash now',
        checkNameText: 'Check',
        checkDescriptionText: 'Charge client by Check now',

        //View Properties
        id: 'payment_lookup',
        security: null,
        queryOrderBy: 'Name asc',
        hideSearch: true,

        createStore: function() {
            return new Memory({
                idProperty: '$key',
                data: [
                    {$key: 0, Name: this.accountNameText, Description: this.accountDescriptionText},
                    {$key: 1, Name: this.creditNameText, Description: this.creditDescriptionText},
                    {$key: 2, Name: this.cashNameText, Description: this.cashDescriptionText},
                    {$key: 3, Name: this.checkNameText, Description: this.checkDescriptionText}
                ]
            });
        }
    });
});