define('Mobile/BillableServices/Views/ServiceCharge/Edit', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/connect',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/query',
    'dojo/string',
    '../../Format',
    '../../Validator',
    '../../ActionBar',
    'Sage/Platform/Mobile/ScrollContainer',
    'Sage/Platform/Mobile/Edit',
    'Sage/Platform/Mobile/_SDataEditMixin',
    'argos!scene',
    'argos!application'
], function(
    declare,
    array,
    connect,
    domConstruct,
    domAttr,
    query,
    string,
    format,
    validator,
    ActionBar,
    ScrollContainer,
    Edit,
    _SDataEditMixin,
    scene,
    application
) {

    return declare('Mobile.BillableServices.Views.ServiceCharge.Edit', [Edit, _SDataEditMixin], {
        //Localization
        titleText: 'Edit Service Ticket',
        clientText: 'Client',
        cancelText: 'Cancel',
        projectText: 'Project',
        itemsText: 'Items',
        serviceTypeText: 'Service',
        chooseClientText: 'Choose Client',
        chooseProjectText: 'Choose Project',
        chooseServiceText: 'Choose Service',
        qtyText: 'QUANTITY',
        priceText: 'PRICE',
        photoText: 'Photo',
        serviceDateText: 'Date',
        noteText: 'Detail',
        addItemText: 'ADD ITEM',
        totalText: 'TOTAL',
        submitTicketText: 'SUBMIT TICKET',
        saveAsDraftText: 'SAVE DRAFT',
        deleteItemText: 'DELETE ITEM',
        completeText: 'Ok',

        //View Properties
        entityName: 'ServiceCharge',
        id: 'service_charge_edit',
        insertSecurity: 'Entities/ServiceCharge/Add',
        updateSecurity: 'Entities/ServiceCharge/Edit',
        queryInclude: [
            'Details'
        ],
        querySelect: [
            'Project/ProjectDescription',
            'Customer/CustomerName',
            'Customer/CustomerID',
            'ServiceDate',
            'Note',
            'Details',
            'Status',
            'Rate'
        ],
        resourceKind: 'serviceCharges',

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

        serviceChargeDetailRowTemplate: new Simplate([
            '<li data-index="{%= $$.getIndex($) %}" data-action="editServiceChargeDetail">',
            '{%! $$.collectionItemTemplate %}',
            '</li>'
        ]),
        serviceChargeDetailItemTemplate: new Simplate([
            '{% var price = Mobile.BillableServices.Format.currency(parseFloat($.Rate) * $.Qty); %}',
            '<h3 class="split-left">{%: $.ServiceDescription %}</h3>',
            '<span class="sub-label">{%: price %}</span>',
            '<h4>{% if ($.Photo) { %}<img class="service-detail-photo" src="{%= $.Photo %}">{% } %}{%: $.Note %}</h4>'
        ]),
        totalRowTemplate: new Simplate([
            '<li class="total-row"><h3 class="split-left">{%: $.TotalText %}</h3><span class="sub-label">{%: $.Total %}</span></li>'
        ]),

        onStartup: function() {
            this.inherited(arguments);

            this.connect(this.fields['Customer'], 'onChange', this.onCustomerChange);
            this.connect(this.fields['Project'], 'onChange', this.onCustomerDependentChange);
            this.connect(this.fields['Details'], 'onChange', this.onDetailsChange);
            this.connect(this.fields['Details'].fields['Qty'], 'onChange', this.onQtyChange);
            this.connect(this.fields['Details'].fields['ServiceType'], 'onChange', this.onServiceTypeChange);
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                top: [{
                    name: 'cancel',
                    label: this.cancelText,
                    place: 'left',
                    publish: '/app/scene/back'
                }],
                action: [{
                    name: 'saveDraft',
                    baseClass: 'button action-button',
                    label: this.saveAsDraftText,
                    action: 'saveDraft',
                    place: 'left',
                    update: this.isFormValid,
                    scope: this
                },{
                    name: 'submitTicket',
                    baseClass: 'button action-button',
                    label: this.submitTicketText,
                    action: 'submitTicket',
                    update: this.isFormValid,
                    place: 'right',
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
        applyContext: function() {
            this.inherited(arguments);

            var project = this.fields['Project'];

            project.dependsOn = null;
            project.where = 'CustomerID ne null';


            var found = App.queryNavigationContext(function(o) {
                return /^(customers|projects)$/.test(o.resourceKind) && o.id;
            });
            var lookup = {
                'customers': this.applyCustomerContext,
                'projects': this.applyProjectContext
            };

            if (found && lookup[found.resourceKind])
                lookup[found.resourceKind].call(this, found);

            connect.publish('/app/toolbar/update', []);
        },
        applyCustomerContext: function(context) {
            var field = this.fields['Customer'];

            field.setValue({
                '$key': context['id'],
                CustomerID: parseInt(context['id'], 10),
                CustomerName: context['label']
            });

            this.onCustomerChange(field.getValue(), field);
        },
        applyProjectContext: function(context) {
            var field = this.fields['Project'];

            var view = scene().getView('project_detail');
            if (view)
            {
                var customer = view.item['Customer'],
                    customerField = this.fields['Customer'];
                customerField.setValue({
                    CustomerID: customer['CustomerID'],
                    CustomerName: customer['CustomerName']
                });
                this.onCustomerChange(customerField.getValue(), customerField);
            }

            field.setValue({
                '$key': context['id'],
                ProjectID: parseInt(context['id'], 10),
                ProjectDescription: context['label']
            });

            this.onCustomerDependentChange(field.getValue(), field);
        },

        onDetailsChange: function(val, field) {
            connect.publish('/app/toolbar/update', []);
        },
        onCustomerChange: function(val, field) {
            var project = this.fields['Project'];

            if (val)
            {
                project.dependsOn = 'Customer';
                project.where = string.substitute('CustomerID eq ${0}', [val['CustomerID'] || val['key']]);

                var currentProjectCustomerID = (this.item && this.item['Project'])
                    ? this.item['Customer']['CustomerID']
                    : project.currentSelection && project.currentSelection['Customer']['CustomerID'];

                if (currentProjectCustomerID != (val['CustomerID'] || val['key']))
                {
                    project.setValue(false);
                }
            }
            else
            {
                project.dependsOn = null;
                project.where = 'CustomerID ne null';
            }
            connect.publish('/app/toolbar/update', []);
        },
        onCustomerDependentChange: function(val, field) {
            if (val && !field.dependsOn && field.currentSelection && field.currentSelection['Customer'])
            {
                var customerField = this.fields['Customer'];
                customerField.setValue({
                    'CustomerID': field.currentSelection['Customer']['CustomerID'],
                    'CustomerName': field.currentSelection['Customer']['CustomerName']
                });
                this.onCustomerChange(customerField.getValue(), customerField);
            }
            connect.publish('/app/toolbar/update', []);
        },
        onServiceTypeChange: function(val, field) {
            var service = field.currentSelection,
                rate = service && service['Rate'],
                qty = this.fields['Details'].fields['Qty'].getValue();

            this.fields['Details'].fields['Price'].setValue(format.currency(rate * qty));
            this.fields['Details'].fields['Rate'].setValue(rate);
        },
        onQtyChange: function(val, field) {
            var service = this.fields['Details'].fields['ServiceType'].currentSelection,
                rate = service && service['Rate'];
            if (!rate) return;

            val = val > 0 ? val : 0;

            this.fields['Details'].fields['Price'].setValue(format.currency(rate * val));
        },
        onPriceChange: function(val, field) {
            var qty = this.fields['Details'].fields['Qty'].getValue();

            this.fields['Details'].fields['Rate'].setValue(val / qty);
        },
        calculateTotal: function(items) {
            var total = 0;

            for (var i = 0; i < items.length; i++)
            {
                var o = items[i];
                if (!o) continue;

                total += o['Rate'] * o['Qty'];
            }

            return {
                Total: format.currency(total),
                TotalText: this.totalText
            };
        },
        editServiceChargeDetail: function(evt, node) {
            var index = parseInt(domAttr.get(node, 'data-index'), 10),
                /* todo: this does not take into account deleted items; values returns the collapsed array */
                values = this.fields['Details'].getValue(),
                item = values[index];

            scene().showView('service_detail_edit', {
                tools: {
                    top: [{
                        name: 'complete',
                        cls: 'complete',
                        label: this.completeText,
                        fn: this.completeServiceChargeDetailEdit.bindDelegate(this, index),
                        scope: this
                    },{
                        name: 'cancel',
                        place: 'left',
                        label: this.cancelText,
                        publish: '/app/scene/back'
                    }],
                    action: [{
                        name: 'delete',
                        baseClass: 'button destructive-button',
                        label: this.deleteItemText,
                        place: 'full',
                        fn: this.deleteServiceChargeDetailEdit.bindDelegate(this, index),
                        scope: this
                    }]
                },
                item: item
            });
        },
        completeServiceChargeDetailEdit: function(view, tool, index) {
            if (view instanceof Sage.Platform.Mobile.Edit)
            {
                view.hideValidationSummary();
                if (view.validate() !== false)
                {
                    view.showValidationSummary();
                    return;
                }
            }

            var value = view.getValues(true);
            this.fields['Details'].update(index, value);
            scene().back();
        },
        deleteServiceChargeDetailEdit: function(view, tool, index) {
            this.fields['Details'].remove(index);
            scene().back();
        },
        getValues: function() {
            var values = this.inherited(arguments);

            if (this.inserting)
            {
                values['Status'] = 4;
                values['PaymentMethod'] = 0;
                values['UserID'] = application().context['user']['UserID'];
            }

            return values;
        },
        saveDraft: function() {
            this.save();
        },
        submitTicket: function() {
            if (this.isFormDisabled())  return;

            this.hideValidationSummary();

            if (this.validate() !== false)
            {
                this.showValidationSummary();
                return;
            }

            var entry = this.getValues(true),
                options;

            entry['Status'] = 0;

            if (this.inserting)
            {
                options = {
                    returnTo: -2,
                    changes: entry,
                    template: {},
                    insert: true
                };
            }
            else
            {
                entry['$key'] = this.item['ServiceChargeID'] || this.item['$key'];

                options = {
                    returnTo: -2,
                    item: entry
                };
            }

            scene().showView('service_charge_submit', options);
        },
        formatDeletedValue: function(val) {
            return {
                '$key': val['$key'] || val['ServiceChargeID'],
                '$isDeleted': true
            };
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                name: 'Customer',
                property: 'Customer',
                label: this.clientText,
                type: 'lookup',
                useSelectionForNew: true,
                textProperty: 'CustomerName',
                keyProperty: 'CustomerID',
                emptyText: this.chooseClientText,
                view: 'client_lookup',
                validator: validator.exists
            },{
                name: 'Project',
                property: 'Project',
                label: this.projectText,
                type: 'lookup',
                textProperty: 'ProjectDescription',
                keyProperty: 'ProjectID',
                emptyText: this.chooseProjectText,
                view: 'project_lookup',
                validator: validator.exists
            },{
                name: 'Details',
                property: 'Details',
                label: this.itemsText,
                type: 'collection-entry',
                validator: validator.hasAtLeastOne,
                addItemText: this.addItemText,
                addButtonClass: 'action-button',
                collectionRowTemplate: this.serviceChargeDetailRowTemplate,
                collectionItemTemplate: this.serviceChargeDetailItemTemplate,
                summaryRowTemplate: this.totalRowTemplate,
                aggregate: this.calculateTotal.bindDelegate(this),
                formatDeletedValue: this.formatDeletedValue,
                layout: [{
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
                    type: 'valueOnly'
                },{
                    name: '$key',
                    property: '$key',
                    type: 'valueOnly'
                }]
            }]);
        }
    });
});
