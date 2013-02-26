define('Mobile/BillableServices/Views/Project/List', [
    'dojo/_base/declare',
    'dojo/dom-class',
    'dojo/string',
    '../../Format',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/GroupedList',
    'Sage/Platform/Mobile/_SDataListMixin',
    'argos!application'
], function(
    declare,
    domClass,
    string,
    format,
    util,
    GroupedList,
    _SDataListMixin,
    application
) {

    return declare('Mobile.BillableServices.Views.Project.List', [GroupedList, _SDataListMixin], {
        //Template
        itemTemplate: new Simplate([
            '<h3>{%: $.ProjectDescription %}</h3>',
            '<h4>{%: $.Customer.CustomerName %}</h4>'
        ]),

        //Localization
        titleText: 'Projects',
        searchText: 'Search Projects',

        //View Properties
        id: 'project_list',
        insertView: 'project_edit',
        detailView: 'project_detail',
        security: 'Entities/Project/View',
        queryWhere: filterByTenant,
        queryOrderBy: 'ProjectDescription asc',
        querySelect: [
            'ProjectDescription',
            'ProjectID',
            'ProjectDate',
            'CustomerName',
            'Customer/CustomerName',
            'Customer/CustomerID'
        ],
        resourceKind: 'projects',

        groupBy: 'ProjectDescription',
        groupClasses: {
            'Customer.CustomerName': 'group-client',
            'ProjectDescription': 'group-project',
            'ProjectDate': 'group-date'
        },
        groupSorts: {
            'Customer.CustomerName': 'CustomerName asc, ProjectDescription asc',
            'ProjectDescription': 'ProjectDescription asc',
            'ProjectDate': 'ProjectDate desc'
        },
        dateHeaderFormatText: 'MMMM YYYY',

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'top': [{
                    id: 'refresh',
                    action: 'refresh'
                }]
            });
        },
        getGroupForItem: function(item) {
            var value = util.getValue(item, this.groupBy);

            if (this.groupBy === 'ProjectDescription')
                value = value[0].toUpperCase();

            if (this.groupBy === 'ProjectDate')
                value = format.date(value, this.dateHeaderFormatText);

            return {
                tag: value, title: value
            };
        },
        refreshRequiredFor: function(options) {
            if (this.options && options)
                if (this.expandExpression(this.options.groupBy) != this.expandExpression(options.groupBy)) return true;

            return this.inherited(arguments);
        },
        beforeTransitionTo: function() {
            var parentNode = this.getParent().domNode,
                oldGroup = this.groupClasses[this.groupBy];

            if (this.options && this.options.groupBy)
                this.groupBy = this.options.groupBy;

            domClass.replace(parentNode, this.groupClasses[this.groupBy], oldGroup);

            this.options.orderBy = this.groupSorts[this.groupBy] || this.queryOrderBy;

            this.inherited(arguments);
        },
        beforeTransitionAway: function() {
            var oldGroup = this.groupClasses[this.groupBy];
                if (oldGroup)
                    domClass.remove(this.getParent().domNode, oldGroup);

            this.inherited(arguments);
        },

        formatSearchQuery: function(searchQuery) {
            return string.substitute("upper(CustomerName) like '${0}%' or upper(ProjectDescription) like '${0}%'", [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});