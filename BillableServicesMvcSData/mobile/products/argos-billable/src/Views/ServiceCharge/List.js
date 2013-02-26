define('Mobile/BillableServices/Views/ServiceCharge/List', [
    'dojo/_base/declare',
    'dojo/dom-class',
    'dojo/string',
    'Sage/Platform/Mobile/Utility',
    '../../Format',
    'Sage/Platform/Mobile/GroupedList',
    'Sage/Platform/Mobile/_SDataListMixin',
    'argos!application'
], function(
    declare,
    domClass,
    string,
    util,
    format,
    GroupedList,
    _SDataListMixin,
    application
) {
    var createWhere = function() {
        var where = [];

        where.push(filterByUser());
        where.push((this.groupBy === 'Status') ? this.draftQuery : this.nonDraftQuery);

        return where.join(' and ');
    };

    return declare('Mobile.BillableServices.Views.ServiceCharge.List', [GroupedList, _SDataListMixin], {
        //Template
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $$.formatDescriptor($) %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),

        itemTemplate: new Simplate([
            '<h3 class="split-left">{%: $$.formatServiceChargeId($.ServiceChargeID) %}</h3>',
            '<span class="sub-label sub-label-light">{%: Mobile.BillableServices.Format.date($.ServiceDate, this.submittedDateFormatText, false) %}</span>',
            '<h4 class="split-left-sub">{%: $.Customer.CustomerName %}</h4>',
            '<span class="sub-label sub-label-two">{%: $.Project.ProjectDescription %}</span>'
        ]),

        //Localization
        titleText: 'Service Tickets',
        searchText: 'Search Service Tickets',
        draftText: 'Draft',
        dateHeaderFormatText: 'MMMM YYYY',
        submittedDateFormatText: 'MM/DD/YYYY hh:mmA',
        titleDateFormatText: 'M/D/YYYY',
        timeFormatText: 'hh:mm A',
        serviceChargeIdText: 'ST',
        submittedText: 'Submitted',

        //View Properties
        id: 'service_charge_list',
        insertView: 'service_charge_edit',
        detailView: 'service_charge_detail',
        security: 'Entities/ServiceCharge/View',
        queryWhere: createWhere,
        queryOrderBy: 'ServiceChargeID asc',
        queryInclude: [
            'Project',
            'Customer'
        ],
        querySelect: [
            'UserName',
            'ServiceChargeID',
            'ServiceDate',
            'Project/ProjectDescription',
            'Project/ProjectID',
            'Customer/CustomerName',
            'Customer/CustomerID',
            'Status'
        ],
        resourceKind: 'serviceCharges',

        draftQuery: '(Status eq 4)',
        nonDraftQuery: '(Status ne 4)',
        draftIcon: 'content/images/icons/caution_32.png',
        groupBy: 'Status',
        groupClasses: {
            'Status': 'group-status',
            'Customer.CustomerName': 'group-client',
            'Project.ProjectDescription': 'group-project',
            'ServiceDate': 'group-date'
        },
        groupSorts: {
            'Status': 'ServiceChargeID desc',
            'Customer.CustomerName': 'CustomerName asc, ServiceDate desc',
            'Project.ProjectDescription': 'ProjectDescription asc, ServiceDate desc',
            'ServiceDate': 'ServiceDate desc'
        },

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'top': [{
                    id: 'refresh',
                    action: 'refresh'
                }]
            });
        },
        formatDescriptor: function(item) {
            var key = this.formatServiceChargeId(item['$key']),
                date = (item['Status'] === 4) ? this.draftText : format.date(item['ServiceDate'], this.titleDateFormatText, false);
            return string.substitute('${0} - ${1}', [key, date]);
        },
        formatServiceChargeId: function(id) {
            return string.substitute('${0}${1}', [this.serviceChargeIdText, string.pad(id, 4, '0')]);
        },
        formatDate: function(val, entry) {
            if (entry['Status'] === 4)
                return this.draftText;

            return string.substitute('${0} ${1}', [this.submittedText, format.date(val, this.submittedDateFormatText, false)]);
        },
        getGroupForItem: function(item) {
            var value = util.getValue(item, this.groupBy);

            if (this.groupBy === 'ServiceDate')
                value = format.date(value, 'MMMM YYYY', false);

            if (this.groupBy === 'Status')
                return {tag: 1, title: false};

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
            // data does not store "ST001", only the value 1
            var re = new RegExp(this.serviceChargeIdText + '\\d+');
            if (re.test(searchQuery))
                searchQuery = searchQuery.replace(this.serviceChargeIdText, '');

            if (!isNaN(searchQuery))
            {
                searchQuery = parseInt(searchQuery, 10).toString();
                return string.substitute('ServiceChargeID eq ${0}', [this.escapeSearchQuery(searchQuery)]);
            }

            return string.substitute("upper(CustomerName) like '${0}%' or upper(ProjectDescription) like '${0}%'", [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});