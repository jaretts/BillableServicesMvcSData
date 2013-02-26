define('Mobile/BillableServices/Views/Contact/EmailList', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/dom-construct',
    './List',
    'Sage/Platform/Mobile/_SDataListMixin',
    'argos!application'
], function(
    declare,
    string,
    domConstruct,
    ContactList,
    _SDataListMixin,
    application
) {

    return declare('Mobile.BillableServices.Views.Contact.EmailList', [ContactList, _SDataListMixin], {
        //Template
        itemTemplate: new Simplate([
            '<h3>{%: $.ContactName %}</h3>',
            '<h4>{%: $.OfficeEmailAddress %}</h4>'
        ]),

        //Localization
        titleText: 'Emails',
        selfText: 'Me',

        //View Properties
        id: 'contact_email_list',
        querySelect: [
            'ContactName',
            'OfficeEmailAddress'
        ],
        hideSearch: true,

        _processData: function(items) {
            this.inherited(arguments);

            var self = {
                $key: 'self',
                ContactName: this.selfText,
                OfficeEmailAddress: application().context['user']['EmailAddress']
            };

            this.items['self'] = self;

            if (this.position == 0 && items.length <= 0)
            {
                domConstruct.place(this.rowTemplate.apply(self, this), this.contentNode, 'only');
            }
            else
            {
                domConstruct.place(this.rowTemplate.apply(self, this), this.contentNode, 'last');
            }
       }
    });
});