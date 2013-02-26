define('Mobile/BillableServices/Views/Project/Detail', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/dom-attr',
    'dojo/dom-construct',
    '../../Format',
    'Sage/Platform/Mobile/Detail',
    'Sage/Platform/Mobile/_SDataDetailMixin',
    'argos!scene'
], function(
    declare,
    string,
    domAttr,
    domConstruct,
    format,
    Detail,
    _SDataDetailMixin,
    scene
) {

    return declare('Mobile.BillableServices.Views.Project.Detail', [Detail, _SDataDetailMixin], {
        //Localization
        titleText: 'Project',
        relatedText: 'Related',
        budgetText: 'Budget',
        billedAmtText: 'Invoiced',
        remainingText: 'Remaining',
        relatedServiceChargesText: 'Tickets',

        //View Properties
        id: 'project_detail',
        editView: 'project_edit',
        security: 'Entities/Project/View',
        querySelect: [
            'ProjectDescription',
            'Customer/CustomerName',
            'Customer/CustomerID',
            'Budget',
            'BilledAmt'
        ],
        tier: 0,
        resourceKind: 'projects',
        customerDetailView: 'client_detail',

        projectNameTemplate: new Simplate([
            '<div class="row {%= $.entry.cls %}" data-property="{%= $.entry.property || $.entry.name %}">',
            '<h3>{%: $.entry.ProjectDescription %}</h3>',
            '<h4 data-action="navigateToCustomerDetail" data-key="{%= $.entry.Customer.CustomerID %}">{%: $.entry.Customer.CustomerName %}</h4>',
            '</div>'
        ]),

        calculateRemaining: function(entry) {
            return entry['Budget'] - entry['BilledAmt'];
        },
        navigateToCustomerDetail: function(evt, node) {
            var customerKey = domAttr.get(node, 'data-key');
            scene().showView(this.customerDetailView, {
                key: customerKey
            });
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: false,
                name: 'DetailSections',
                cls: 'detail-inner',
                children: [{
                    name: 'ProjectDescription',
                    use: this.projectNameTemplate
                },{
                    name: 'Budget',
                    property: 'Budget',
                    cls: 'value-right',
                    label: this.budgetText,
                    renderer: format.currency
                },{
                    name: 'BilledAmt',
                    property: 'BilledAmt',
                    cls: 'value-right',
                    label: this.billedAmtText,
                    renderer: format.currency
                },{
                    name: 'Remaining',
                    cls: 'value-right row-total',
                    label: this.remainingText,
                    value: this.calculateRemaining,
                    renderer: format.currency
                }]
            },{
                title: this.relatedText,
                name: 'RelatedSection',
                list: true,
                cls: 'list-content detail-list',
                children: [{
                    name: 'ServiceTicketRelated',
                    cls: 'related-tickets',
                    // icon: 'content/images/icons/history-tab-icon-active.png',
                    label: this.relatedServiceChargesText,
                    where: this.formatRelatedQuery.bindDelegate(this, 'ProjectID eq "${0}"'),
                    options: {
                        groupBy: 'ServiceDate'
                    },
                    view: 'service_charge_lookup'
                }]
            }]);
        }
    });
});