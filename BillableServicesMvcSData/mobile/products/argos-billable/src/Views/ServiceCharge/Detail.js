define('Mobile/BillableServices/Views/ServiceCharge/Detail', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/string',
    '../../Format',
    '../../ActionBar',
    'Sage/Platform/Mobile/ScrollContainer',
    'Sage/Platform/Mobile/Detail',
    'Sage/Platform/Mobile/_SDataDetailMixin',
    'argos!scene'
], function(
    declare,
    array,
    lang,
    domClass,
    string,
    format,
    ActionBar,
    ScrollContainer,
    Detail,
    _SDataDetailMixin,
    scene
) {

    return declare('Mobile.BillableServices.Views.ServiceCharge.Detail', [Detail, _SDataDetailMixin], {
        //Localization
        titleText: 'Service Ticket',
        draftText: 'Draft',
        submittedText: 'Submitted:',
        totalText: 'TOTAL',
        submitText: 'SUBMIT TICKET',
        serviceTicketText: 'ST',
        editText: 'EDIT TICKET',

        //View Properties
        id: 'service_charge_detail',
        editView: 'service_charge_edit',
        security: 'Entities/ServiceCharge/View',
        queryInclude: [
            'Details'
        ],
        querySelect: [
            'Project/ProjectDescription',
            'Project/ProjectID',
            'Customer/CustomerName',
            'Customer/CustomerID',
            'ServiceDate',
            'ServiceChargeID',
            'Note',
            'Status',
            'Details/*'
        ],
        tier: 0,
        resourceKind: 'serviceCharges',

        submitView: 'service_charge_submit',
        draftIcon: 'content/images/icons/draft-status.png',

        components: [
            {name: 'fix', content: '<a href="#" class="android-6059-fix">fix for android issue #6059</a>'},
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', components: [
                {name: 'scroll', tag: 'div', components: [
                    {name: 'content', tag: 'div', attrs: {'class': 'detail-content'}, attachPoint: 'contentNode'},
                    {name: 'action', attachPoint: 'toolbars.action', type: ActionBar, props: {managed: true}}
                ]}
            ]}
        ],

        serviceChargeHeaderTemplate: new Simplate([
            '<div class="row {%= $.entry.cls %}" data-property="{%= $.entry.property || $.entry.name %}">',
                '<h3 class="split-left {% if ($.entry.Status === 4) { %}is-draft{% } %}">',
                '{%: $$.formatServiceChargeId($.entry.ServiceChargeID) %}</h3>',
                '<span class="sub-label sub-label-light">{%: $$.formatDate($.entry.ServiceDate, $.entry) %}</span>',
                '<h4 class="split-left-sub">{%: $.entry.Customer.CustomerName %}</h4>',
                '<span class="sub-label sub-label-two">{%: $.entry.Project.ProjectDescription %}</span>',
            '</div>'
        ]),

        serviceDetailRowTemplate: new Simplate([
            /* todo: to be enabled once a detail view is available */
            //'<li class="col-3" data-action="{%= $.action %}" data-key="{%= $.value.$key %}" data-view="{%= $.view %}" data-context="{%: $.context %}">',
            '<li class="col-3">',
            '<span>{%: $.value.ServiceDescription %}</span>',
            '<span>{%: $.value.Qty %}</span>',
            '<span>{%: Mobile.BillableServices.Format.currency($.value.Total) %}</span>',
            '</li>'
        ]),
        serviceDetailTotalTemplate: new Simplate([
            '<li class="row-total">',
            '<span>{%: $.value.Title %}</span>',
            '<span class="sub-label">{%: Mobile.BillableServices.Format.currency($.value.Total) %}</span>',
            '</li>'
        ]),

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'top': [],
                action: [{
                    baseClass: 'button action-button',
                    name: 'edit',
                    label: this.editText,
                    place: 'left',
                    action: 'navigateToEditView',
                    update: this.enableForDraft,
                    security: App.getViewSecurity(this.editView, 'update'),
                    scope: this
                },{
                    name: 'submitTicket',
                    baseClass: 'button action-button',
                    label: this.submitText,
                    action: 'submitTicket',
                    place: 'right',
                    update: this.enableForDraft,
                    scope: this
                }]
            });
        },
        enableForDraft: function(context) {
            if (!context) return;
            var isDraft = context.isDraft.call(context);

            this.set('enabled', isDraft);
            domClass.toggle(this.domNode, 'is-hidden', !isDraft);
        },

        calculateDetailTotal: function(entry) {
            return entry['Qty'] * entry['Rate'];
        },
        formatServiceChargeId: function(val) {
            return string.substitute('${0}${1}', [this.serviceTicketText, string.pad(val, 4, '0')]);
        },
        formatDate: function(val, entry) {
            if (entry['Status'] === 4)
                return this.draftText;

            return string.substitute('${0} ${1}', [this.submittedText, format.date(val)]);
        },
        isDraft: function() {
            if (!this.item) return false;
            return this.item['Status'] === 4;
        },
        submitTicket: function() {
            var item = this.item;
            if (item['ServiceChargeID'])
                item['$key'] = item['ServiceChargeID'];

            scene().showView(this.submitView, {
                item: this.item
            }, null, {
                returnTo: -1
            });
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: false,
                name: 'DetailSections',
                cls: 'detail-inner',
                children: [{
                    name: 'ServiceChargeHeader',
                    use: this.serviceChargeHeaderTemplate
                },{
                    title: false,
                    list: true,
                    cls: 'list-content detail-list',
                    name: 'Details',
                    property: 'Details',
                    children: this.createServiceDetailsLayout
                }]
            }]);
        },

        createServiceDetailsLayout: function(row, value, item) {
            var store = this.get('store'),
                runningTotal = 0,
                rows = array.map(value, function(value) {
                    var itemTotal = this.calculateDetailTotal(value);

                    runningTotal += itemTotal;
                    lang.mixin(value, {
                        Total: itemTotal
                    });

                    return {
                        rowTemplate: this.serviceDetailRowTemplate,

                        /* todo: provide a detail view
                        view: 'service_detail_detail',
                        action: 'navigateToRelatedView',
                        options: {
                            key: value['ServiceTypeID']
                        },
                        */

                        value: value
                    };
                }, this);

            rows.push({
                rowTemplate: this.serviceDetailTotalTemplate,
                value: {Title: this.totalText, Total: runningTotal}
            });

            return rows;
        }
    });
});