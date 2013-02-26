define('Mobile/BillableServices/ApplicationViews', {
    'diag': {type: 'Mobile/BillableServices/Views/Diag'},
    'generic_calendar': {type: 'Sage/Platform/Mobile/Calendar'},
    'signature_edit': {type: 'Mobile/BillableServices/Views/Signature'},

    'quick_nav': {type: 'Mobile/BillableServices/Views/QuickNav'},
    'home': {type: 'Mobile/BillableServices/Views/Home'},
    'login': {type: 'Mobile/BillableServices/Views/Login'},

    'client_list': {type: 'Mobile/BillableServices/Views/Client/List'},
    'client_related': {type: 'Mobile/BillableServices/Views/Client/List'},
    'client_lookup': {type: 'Mobile/BillableServices/Views/Client/Lookup'},
    'client_detail': {type: 'Mobile/BillableServices/Views/Client/Detail'},
    'client_edit': {type: 'Mobile/BillableServices/Views/Client/Edit'},

    'contact_list': {type: 'Mobile/BillableServices/Views/Contact/List'},
    'contact_related': {type: 'Mobile/BillableServices/Views/Contact/List'},
    'contact_detail': {type: 'Mobile/BillableServices/Views/Contact/Detail'},
    'contact_edit': {type: 'Mobile/BillableServices/Views/Contact/Edit'},
    'contact_email_list': {type: 'Mobile/BillableServices/Views/Contact/EmailList'},

    'project_list': {type: 'Mobile/BillableServices/Views/Project/List'},
    'project_related': {type: 'Mobile/BillableServices/Views/Project/List'},
    'project_lookup': {type: 'Mobile/BillableServices/Views/Project/Lookup'},
    'project_detail': {type: 'Mobile/BillableServices/Views/Project/Detail'},
    'project_edit': {type: 'Mobile/BillableServices/Views/Project/Edit'},

    'service_charge_list': {type: 'Mobile/BillableServices/Views/ServiceCharge/List'},
    'service_charge_related': {type: 'Mobile/BillableServices/Views/ServiceCharge/List', props: {
        queryWhere: filterByUser,
        itemTemplate: new Simplate([
            '<h3 class="split-left {% if ($.Status === 4) { %}is-draft{% } %}">{%: $$.formatServiceChargeId($.ServiceChargeID) %}</h3>',
            '<span class="sub-label">{%: Mobile.BillableServices.Format.date($.ServiceDate, this.submittedDateFormatText, false) %}</span>',
            '<h4 class="split-left-sub">{%: $.UserName %}</h4>',
            '<span class="sub-label sub-label-light">{%: $.Project.ProjectDescription %}</span>'
        ])
    }},
    'service_charge_lookup': {type: 'Mobile/BillableServices/Views/ServiceCharge/List'},
    'service_charge_detail': {type: 'Mobile/BillableServices/Views/ServiceCharge/Detail'},
    'service_charge_edit': {type: 'Mobile/BillableServices/Views/ServiceCharge/Edit'},
    'service_charge_submit': {type: 'Mobile/BillableServices/Views/ServiceCharge/Submit'},

    'service_detail_edit': {type: 'Mobile/BillableServices/Views/ServiceDetail/Edit'},

    'service_type_list': {type: 'Mobile/BillableServices/Views/ServiceType/List'},
    'add_client_contact': {type: 'Mobile/BillableServices/Views/AddClientContact'},
    'payment_lookup': {type: 'Mobile/BillableServices/Views/PaymentLookup'}
});
