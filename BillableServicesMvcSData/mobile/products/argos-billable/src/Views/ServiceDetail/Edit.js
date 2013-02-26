define('Mobile/BillableServices/Views/ServiceDetail/Edit', [
    'dojo/_base/declare',
    'dojo/string',
    '../../Format',
    '../../Validator',
    '../../ActionBar',
    'Sage/Platform/Mobile/ScrollContainer',
    'Sage/Platform/Mobile/Edit',
    'Sage/Platform/Mobile/_SDataEditMixin'
], function(
    declare,
    string,
    format,
    validator,
    ActionBar,
    ScrollContainer,
    Edit,
    _SDataEditMixin
) {

    return declare('Mobile.BillableServices.Views.ServiceDetail.Edit', [Edit, _SDataEditMixin], {
        //Localization
        titleText: 'Edit Ticket Item',
        serviceTypeText: 'Service',
        chooseServiceText: 'Choose Service',
        qtyText: 'QUANTITY',
        priceText: 'PRICE',
        photoText: 'Photo',
        noteText: 'Detail',

        //View Properties
        entityName: 'ServiceDetail',
        id: 'service_detail_edit',
        insertSecurity: 'Entities/ServiceDetail/Add',
        updateSecurity: 'Entities/ServiceDetail/Edit',
        querySelect: [
            'ServiceDescription',
            'Qty',
            'Note'
        ],
        resourceKind: 'serviceDetails',

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

        qtyPriceTemplate: new Simplate([
            '<input data-dojo-attach-point="inputNode" data-dojo-attach-event="onkeyup: _onKeyUp, onblur: _onBlur, onfocus: _onFocus" class="text-input" type="{%: $.inputType %}" name="{%= $.name %}" {% if ($.readonly) { %} readonly {% } %}>',
            '<label for="{%= $.name %}">{%: $.label %}</label>'
        ]),

        startup: function() {
            this.inherited(arguments);
            this.connect(this.fields['Qty'], 'onChange', this.onQtyChange);
            this.connect(this.fields['ServiceType'], 'onChange', this.onServiceTypeChange);
        },
        load: function() {
            this.inherited(arguments);
            var values = this.item;

            if (values['ServiceTypeID'] && values['ServiceDescription'])
            {
                this.fields['ServiceType'].setValue({
                    ServiceTypeID: values['ServiceTypeID'],
                    ServiceDescription: values['ServiceDescription']
                }, true);
            }

            if (values['Rate'] && values['Qty'])
                this.fields['Price'].setValue(format.currency(values['Rate'] * values['Qty']));
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                top: [{
                    name: 'cancel',
                    label: this.cancelText,
                    place: 'left',
                    publish: '/app/scene/back'
                }],
                action: []
            });
        },
        onServiceTypeChange: function(val, field) {
            var service = field.currentSelection,
                rate = service && service['Rate'],
                qty = this.fields['Qty'].getValue();

            this.fields['Price'].setValue(format.currency(rate * qty));
            this.fields['Rate'].setValue(rate);
        },
        onQtyChange: function(val, field) {
            var service = this.fields['ServiceType'].currentSelection,
                rate = (service && service['Rate']) || this.fields['Rate'].getValue();
            if (!rate) return;

            val = val > 0 ? val : 0;

            this.fields['Price'].setValue(format.currency(rate * val));
        },
        onPriceChange: function(val, field) {
            var qty = this.fields['Qty'].getValue();

            this.fields['Rate'].setValue(val / qty);
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                    name: 'ServiceType',
                    property: 'ServiceType',
                    label: this.serviceTypeText,
                    cls: 'servicecharge-row-servicetype',
                    applyTo: '.',
                    type: 'lookup',
                    textProperty: 'ServiceDescription',
                    keyProperty: 'ServiceTypeID',
                    emptyText: this.chooseServiceText,
                    view: 'service_type_list',
                    validator: validator.exists
                },{
                    name: 'Qty',
                    property: 'Qty',
                    label: this.qtyText,
                    cls: 'servicecharge-row-qty',
                    type: 'decimal',
                    precision: 0,
                    'default': 0,
                    notificationTrigger: 'blur',
                    validationTrigger: 'keyup',
                    validator: [validator.isDecimal, validator.greaterThanZero]
                },{
                    name: 'Price',
                    label: this.priceText,
                    cls: 'servicecharge-row-price',
                    type: 'text',
                    'default': format.currency(0),
                    readonly: true,
                    include: false
                },{
                    name: 'Photo',
                    label: this.photoText,
                    type: 'camera',
                    thumbHeight: 64,
                    thumbWidth: 64,
                    include: true
                },{
                    name: 'Note',
                    property: 'Note',
                    label: this.noteText,
                    type: 'text',
                    validationTrigger: 'keyup',
                    maxTextLength: 255,
                    validator: validator.exceedsMaxTextLength
                },{
                    name: 'Rate',
                    property: 'Rate',
                    type: 'valueOnly',
                    valueOnly: true
                },{
                    name: '$key',
                    property: '$key',
                    type: 'valueOnly'
                }]
            );
        }
    });
});