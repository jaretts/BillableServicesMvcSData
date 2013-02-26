define('Mobile/BillableServices/Views/ServiceCharge/Submit', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/connect',
    'dojo/string',
    '../../Format',
    '../../Validator',
    '../../ActionBar',
    'Sage/Platform/Mobile/ScrollContainer',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit',
    'Sage/Platform/Mobile/_SDataEditMixin'
], function(
    declare,
    lang,
    connect,
    string,
    format,
    validator,
    ActionBar,
    ScrollContainer,
    util,
    Edit,
    _SDataEditMixin
) {

    return declare('Mobile.BillableServices.Views.ServiceCharge.Submit', [Edit, _SDataEditMixin], {
        //Localization
        titleText: 'Submit Ticket',
        paymentText: 'Payment',
        recipientText: 'Recipient',
        signatureText: 'Signature',
        emptyPaymentText: 'Choose Payment Method',
        emptyRecipientText: 'Choose Recipient Email',
        totalText: 'TOTAL',
        submitText: 'SUBMIT',

        //View Properties
        entityName: 'ServiceCharge',
        id: 'service_charge_submit',
        insertSecurity: 'Entities/ServiceCharge/Add',
        updateSecurity: 'Entities/ServiceCharge/Edit',
        querySelect: [
            'Payment',
            'Recipient',
            'Status'
        ],
        resourceKind: 'serviceCharges',

        serviceChargeDetailTemplate: new Simplate([
            '{% var price = Mobile.BillableServices.Format.currency(parseFloat($.Rate) * $.Qty); %}',
            '<h3 class="split-left">{%: $.ServiceDescription %}</h3>',
            '<span class="sub-label">{%: price %}</span>',
            '<h4>{% if ($.Photo) { %}<img class="service-detail-photo" src="{%= $.Photo %}">{% } %}{%: $.Note %}</h4>'
        ]),
        totalRowTemplate: new Simplate([
            '<li class="total-row"><h3 class="split-left">{%: $.TotalText %}</h3><span class="sub-label">{%: $.Total %}</span></li>'
        ]),

        components: [
            {name: 'fix', content: '<a href="#" class="android-6059-fix">fix for android issue #6059</a>'},
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', props: {enableFormFix:true}, components: [
                {name: 'scroll', tag: 'div', components: [
                    {name: 'loading', content: Simplate.make('<div class="loading-indicator"><div>{%: $.loadingText %}</div></div>')},
                    {name: 'validation', tag: 'div', attrs: {'class': 'validation-summary'}, components: [
                        {name: 'validationTitle', content: Simplate.make('<h2>{%: $.validationSummaryText %}</h2>')},
                        {name: 'validationContent', tag: 'ul', attachPoint: 'validationContentNode'}
                    ]},
                    {name: 'content', tag: 'div', attrs: {'class': 'edit-content'}, attachPoint: 'contentNode'},
                    {name: 'action', attachPoint: 'toolbars.action', type: ActionBar, props: {managed: true}}
                ]}
            ]}
        ],

        createToolLayout: function() {
            return this.tools || (this.tools = {
                top: [{
                    name: 'cancel',
                    label: this.cancelText,
                    place: 'left',
                    publish: '/app/scene/back'
                }],
                action: [{
                    name: 'submit',
                    baseClass: 'button action-button',
                    label: this.submitText,
                    update: this.isFormValid,
                    action: 'save',
                    place: 'full',
                    scope: this
                }]
            });
        },
        isFormValid: function(context) {
            if (!context) return;

            var isValid = true;
            for (var name in context.fields)
            {
                var field = context.fields[name];
                if (!field.isHidden() && false !== field.validate())
                {
                    isValid = false;
                    break;
                }
            }

            this.set('enabled', isValid);
        },
        onStartup: function() {
            this.inherited(arguments);
            this.connect(this.fields['PaymentMethod'], 'onChange', this.onFieldChange);
            this.connect(this.fields['Recipient'], 'onChange', this.onFieldChange);
        },
        onFieldChange: function(val, field) {
            connect.publish('/app/toolbar/update', []);
        },
        getValues: function() {
            var values;
            if (this.changes)
                values = lang.mixin(this.changes, this.inherited(arguments));
            else
                values = this.inherited(arguments);

            values['PaymentMethod'] = parseInt(values['PaymentMethod']['$key'], 10);
            values['Recipient'] = values['Recipient']['OfficeEmailAddress'];

            // For non add to account payments the status should be 2 (approved)
            values['Status'] = (parseInt(values['PaymentMethod'], 10) === 0) ? 0 : 2;

            return values;
        },
        calculateTotal: function(items) {
            var total = 0;

            for (var i = 0; i < items.length; i++)
            {
                var o = items[i];
                if (!o) continue;

                total += parseFloat(o['Rate']) * o['Qty'];
            }

            return {
                Total: format.currency(total),
                TotalText: this.totalText
            };
        },
        formatDependentContactQuery: function(fmt) {
            var customer = this.inserting ? this.changes['Customer'] : this.item['Customer'],
                key = customer['$key'] || customer['CustomerID'];

            return string.substitute(fmt, [key]);
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: false,
                name: 'FinalDetailSection',
                children: [{
                    name: 'Details',
                    property: 'Details',
                    label: '',
                    type: 'collection-entry',
                    collectionItemTemplate: this.serviceChargeDetailTemplate,
                    summaryRowTemplate: this.totalRowTemplate,
                    aggregate: this.calculateTotal.bindDelegate(this)
                },{
                    name: 'PaymentMethod',
                    property: 'PaymentMethod',
                    label: this.paymentText,
                    type: 'lookup',
                    view: 'payment_lookup',
                    textProperty: 'Name',
                    emptyText: this.emptyPaymentText,
                    validator: validator.exists
                },{
                    name: 'Recipient',
                    property: 'Recipient',
                    label: this.recipientText,
                    type: 'lookup',
                    view: 'contact_email_list',
                    emptyText: this.emptyRecipientText,
                    where: this.formatDependentContactQuery.bindDelegate(
                        this, 'CustomerID eq ${0}'
                    ),
                    textProperty: 'OfficeEmailAddress',
                    valueProperty: 'OfficeEmailAddress',
                    validator: validator.exists
                },{
                    name: 'Signature',
                    property: 'Signature',
                    include: false,
                    label: this.signatureText,
                    type: 'signature',
                    previewHeight: 80
                }]
            }]);
        }
    });
});