define('Mobile/BillableServices/Views/ServiceType/List', [
    'dojo/_base/declare',
    'dojo/string',
    '../../Format',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/_SDataListMixin',
    'argos!application'
], function(
    declare,
    string,
    format,
    List,
    _SDataListMixin,
    application
 ) {

    return declare('Mobile.BillableServices.Views.ServiceType.List', [List, _SDataListMixin], {
        //Template
        itemTemplate: new Simplate([
            '<h3 class="split-left">{%: $.ServiceDescription %}</h3>',
            '<span class="sub-label">{%: $$.formatRate($.Rate) %}/{%: $$.uomShortText[$.UOM] || $.UOM %}</span>',
            '<h4>{%: $.LongDescription %}</h4>'
        ]),

        //Localization
        titleText: 'Service Types',
        searchText: 'Search Types',

        //View Properties
        id: 'service_type_list',
        insertView: 'service_type_edit',
        detailView: 'service_type_detail',
        security: 'Entities/ServiceType/View',
        queryWhere: filterByTenant,
        queryOrderBy: 'ServiceDescription asc',
        querySelect: [
            'ServiceDescription',
            'UOM',
            'Rate',
            'ServiceTypeID',
            'LongDescription'
        ],
        resourceKind: 'serviceTypes',

        uomShortText: {
            'hours': 'hr',
            'each': 'ea'
        },

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'top': [{
                    id: 'refresh',
                    action: 'refresh'
                }]
            });
        },
        formatRate: function(val) {
            return format.currency(val, 0);
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(ServiceDescription) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});