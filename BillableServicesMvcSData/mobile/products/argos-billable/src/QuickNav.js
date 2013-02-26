define('Mobile/BillableServices/QuickNav', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/topic',
    'dojox/mobile/FixedSplitterPane',
    'Sage/Platform/Mobile/_UiComponent',
    'Sage/Platform/Mobile/_EventMapMixin',
    'Sage/Platform/Mobile/ScrollContainer',
    'argos!scene',
    'argos!customizations'
], function(
    declare,
    array,
    lang,
    win,
    domAttr,
    domConstruct,
    domClass,
    topic,
    FixedSplitterPane,
    _UiComponent,
    _EventMapMixin,
    ScrollContainer,
    scene,
    customizations
) {
    return declare('Mobile.BillableServices.QuickNav', [FixedSplitterPane, _EventMapMixin, _UiComponent], {
        events: {
            'click': true
        },
        baseClass: 'quick-nav',
        components: [
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', components: [
                {name: 'scroll', tag: 'div', components: [
                    {name: 'content', tag: 'ul', attrs: {'class': 'quick-nav-content'}, attachPoint: 'contentNode'}
                ]}
            ]}
        ],

        id: 'quick_nav',
        rowTemplate: new Simplate([
            '<li class="quick-nav-item" data-action="{%= $.action %}" data-view="{%= $.view %}">',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '{% if ($.icon) { %}',
            '<img src="{%: $.icon %}" alt="icon" class="icon" />',
            '{% } %}',
            '<span>{%: $.title %}</span>'
        ]),

        homeText: 'Home',
        clientsText: 'Clients',
        projectsText: 'Projects',
        serviceChargesText: 'My Tickets',
        settingsText: 'Settings',
        logOutText: 'Log Out',

        _setExpandedAttr: function(value) {
            this._expanded = value;

            domClass.toggle(win.body(), 'has-expanded-navigation', value);

            this.onExpandChange(value);
        },
        _getExpandedAttr: function() {
            return this._expanded;
        },
        onStartup: function() {
            this.inherited(arguments);

            this.subscribe('/app/navigation/expand/toggle', this.toggle);

            this.createNavigation();
        },
        onContentChange: function() {
        },
        navigateBack: function() {
            scene().back();
        },
        navigateToView: function(evt, node) {
            var view = node && domAttr.get(node, 'data-view');
            if (view)
            {
                scene().showView(view);

                this.set('expanded', false);
            }
        },
        logOut: function() {
            window.location.reload();
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                'name': 'home',
                'view': 'home',
                'action': 'navigateToView',
                // 'icon': 'content/images/icons/home-tab-icon.png',
                'title': this.homeText
            },{
                'name': 'client_list',
                'view': 'client_list',
                'action': 'navigateToView',
                // 'icon': 'content/images/icons/clients-icon.png',
                'title': this.clientsText
            },{
                'name': 'project_list',
                'view': 'project_list',
                'action': 'navigateToView',
                // 'icon': 'content/images/icons/projects-tab-icon.png',
                'title': this.projectsText
            },{
                'name': 'service_charge_list',
                'view': 'service_charge_list',
                'action': 'navigateToView',
                // 'icon': 'content/images/icons/history-tab-icon.png',
                'title': this.serviceChargesText
            },{
                'name': 'settings',
                'view': 'settings',
                'action': 'navigateToView',
                // 'icon': 'content/images/icons/settings-tab-icon.png',
                'title': this.settingsText
            },{
                'name': 'logOut',
                'action': 'logOut',
                // 'icon': 'content/images/icons/settings-tab-icon.png',
                'title': this.logOutText
            }]);
        },
        createNavigation: function() {
            var layout = customizations().apply(customizations().toPath(this.customizationSet, 'navigation', this.id), this.createLayout()),
                output = [];

            array.forEach(layout, function(row) {
                output.push(this.rowTemplate.apply(row, this));
            }, this);

            domConstruct.place(output.join(''), this.contentNode, 'only');

            this.onContentChange();
        },
        toggle: function() {
            var value = !this.get('expanded');

            this.set('expanded', value);
        },
        onExpandChange: function(value)
        {
        }
    });
});