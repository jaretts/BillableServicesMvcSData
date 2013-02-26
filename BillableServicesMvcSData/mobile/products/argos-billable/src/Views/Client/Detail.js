define('Mobile/BillableServices/Views/Client/Detail', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'dojo/dom-construct',
    '../../Format',
    'Sage/Platform/Mobile/Environment',
    'Sage/Platform/Mobile/Detail',
    'Sage/Platform/Mobile/_SDataDetailMixin',
    'argos!scene'
], function(
    declare,
    array,
    string,
    domConstruct,
    format,
    environment,
    Detail,
    _SDataDetailMixin,
    scene
) {

    return declare('Mobile.BillableServices.Views.Client.Detail', [Detail, _SDataDetailMixin], {
        //Localization
        titleText: 'Clients',
        insertNewContactText: 'Add New Contact',
        insertNewContactTitleText: 'New Contact',

        clientHeaderTemplate: new Simplate([
            '<h3>{%: $.entry.CustomerName %}</h3>',
            '<h4 data-action="openAddress" data-address="{%: $$.formatAddress($.entry, true, false) %}">{%= $$.formatAddress($.entry, false, true) %}</h4>'
        ]),

        contactRowTemplate: new Simplate([
            '<li data-action="navigateToRelatedView" data-key="{%: $.value.$key %}" data-view="{%= $.view %}" data-context="{%= $.context %}">',
                '<h3 class="split-left">{%: $.value.ContactName %}</h3>',
                '<span class="sub-label">{% if ($.value.ContactTitle) { %}{%: $.value.ContactTitle %}{% } %}</span>',
            '</li>'
        ]),
        insertContactRowTemplate: new Simplate([
            '<li data-action="insertNewContact">',
                '<span>{%: $$.insertNewContactText %}</span>',
            '</li>'
        ]),
        
        //View Properties
        id: 'client_detail',
        editView: 'client_edit',
        security: 'Entities/Client/View',
        queryInclude: ['Contacts'],
        querySelect: [
            'Contacts/*',
            'CustomerID',
            'CustomerName',
            'StreetAddress',
            'City',
            'StateProvince',
            'PostalCode'
        ],
        tier: 0,
        resourceKind: 'customers',

        insertNewContact: function(evt, node) {
            scene().showView('contact_edit', { insert: true, title: this.insertNewContactTitleText });
        },
        _onRefresh: function(o) {
            this.inherited(arguments);

            if (o.resourceKind === 'contacts')
                this.refreshRequired = true;
        },

        formatAddress: function(entry, singleLine, asHtml, join) {
            var lines = [];
            lines.push(entry['StreetAddress']);

            var fmt = (entry['City'])
                ? '${City}, ${StateProvince} ${PostalCode}'
                : '${StateProvince} ${PostalCode}';

            lines.push(string.trim(string.substitute(fmt, entry, function(o){ return o || '';})));

            return (singleLine)
                ? lines.join(' ')
                : (asHtml) ? lines.join(join || '<br/>') : lines.join(join || '\r\n');
        },

        openAddress: function(evt, node){
            var address = node.getAttribute('data-address');
            environment.showMapForAddress(address);
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: false,
                name: 'ClientDetailSection',
                cls: 'client-detail-header',
                children: [{
                    name: 'Header',
                    use: this.clientHeaderTemplate
                }]
            },{
                title: false,
                list: true,
                cls: 'detail-list detail-list-small',
                name: 'ContactsSection',
                property: 'Contacts',
                children: this.createContactsLayout
            }]);
        },

        createContactsLayout: function(row, value, item) {
            var contactLayout = array.map(value, function(value) {
                return {
                    rowTemplate: this.contactRowTemplate,
                    view: 'contact_detail',
                    options: {
                        key: value['$key']
                    },
                    value: value
                };
            }, this);

            contactLayout.push({
                rowTemplate: this.insertContactRowTemplate
            });

            return contactLayout;
        }
    });
});