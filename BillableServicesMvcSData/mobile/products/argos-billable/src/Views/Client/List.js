define('Mobile/BillableServices/Views/Client/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/GroupedList',
    'Sage/Platform/Mobile/_SDataListMixin'
], function(
    declare,
    string,
    GroupedList,
    _SDataListMixin
) {

    return declare('Mobile.BillableServices.Views.Client.List', [GroupedList, _SDataListMixin], {
        //Template
        itemTemplate: new Simplate([
            '<h3>{%: $.CustomerName %}</h3>'
        ]),

        //Localization
        titleText: 'Clients',best
        searchText: 'Search Clients',

        //View Properties
        id: 'client_list',
        insertView: 'client_edit',
        detailView: 'client_detail',
        security: 'Entities/Customer/View',
        queryWhere: filterByTenant,
        queryOrderBy: 'CustomerName asc',
        querySelect: [
            'CustomerName',
            'CustomerID'
        ],
        resourceKind: 'customers',

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'top': [{
                    id: 'refresh',
                    action: 'refresh'
                }]
            });
        },
        getGroupForItem: function(item) {
            var name = item['CustomerName'],
                firstChar = name[0].toUpperCase();
            return {
                tag: firstChar,
                title: firstChar
            };
        },

        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(CustomerName) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});