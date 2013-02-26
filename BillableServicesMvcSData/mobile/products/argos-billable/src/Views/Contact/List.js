define('Mobile/BillableServices/Views/Contact/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/GroupedList',
    'Sage/Platform/Mobile/_SDataListMixin',
    'argos!application'
], function(
    declare,
    string,
    GroupedList,
    _SDataListMixin,
    application
) {

    return declare('Mobile.BillableServices.Views.Contact.List', [GroupedList, _SDataListMixin], {
        //Template
        itemTemplate: new Simplate([
            '<h3>{%: $.ContactName %}</h3>',
            '<h4>{%: $.ContactTitle %}</h4>'
        ]),

        //Localization
        titleText: 'Contacts',

        //View Properties
        id: 'contact_list',
        security: null,
        queryOrderBy: 'ContactName asc',
        queryWhere: filterByTenant,
        querySelect: [
            'ContactName',
            'ContactTitle'
        ],
        resourceKind: 'contacts',

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'top': [{
                    id: 'refresh',
                    action: 'refresh'
                }]
            });
        },
        getGroupForItem: function(item) {
            var name = item['ContactName'],
                firstChar = name[0].toUpperCase();
            return {
                tag: firstChar,
                title: firstChar
            };
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(ContactName) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});