define('Mobile/BillableServices/PlusBar', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/_base/event',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-attr',
    'dojo/string',
    'Sage/Platform/Mobile/Toolbar',
    'Sage/Platform/Mobile/Utility',
    'argos!scene'
], function(
    declare,
    lang,
    win,
    event,
    domClass,
    domStyle,
    domAttr,
    string,
    Toolbar,
    utility,
    scene
) {
    /* todo: create a common place for this information, in addition to animation events */
    var isWebKit = /webkit/i.test(navigator.userAgent),
        isMoz = /firefox/i.test(navigator.userAgent),
        isOpera = /opera/i.test(navigator.userAgent),
        isIE = /MSIE/i.test(navigator.userAgent);

    var animationEnd = isWebKit ? 'webkitAnimationEnd' : isMoz ? 'animationend' : isOpera ? 'oAnimationEnd' : isIE ? 'MSAnimationEnd' : '',
        visibleForSet = function(bar, viewSet) {
            return function(view) {
                this.set('visible', view && bar.viewToSet[view.id] == viewSet);
            };
        },
        withCurrentState = function(item, view, bar, fmt, o) {
            var options = view && view.options;

            if (fmt && options.key)
            {
                return lang.mixin(o || {}, {
                    where: string.substitute(fmt, [options.key])
                });
            }

            if (options.key)
            {
                return lang.mixin(o || {}, {
                    key: options.key,
                    descriptor: options.descriptor
                });
            }
        },
        resolveTransition = function(args, related) {
            return function(item, view, toolbar) {
                // todo: cache this information, create better way of finding it

                var items = toolbar._items,
                    active = toolbar._active;

                var indexA = items.indexOf(active),
                    indexB = items.indexOf(item);

                var transition = {};

                if (indexA >= 0 && indexB >= 0)
                {
                    transition.reverse = (indexB < indexA);
                    transition.always = false; // force transition;
                }

                if (related) transition.returnTo = -1;

                return [typeof args === 'function' ? args(item, view, toolbar) : args, null, transition];
            };
        };

    return declare('Mobile.BillableServices.PlusBar', [Toolbar], {
        viewToSet: {
            'client_detail': 'client',
            'project_related': 'client',
            'service_charge_related': 'client',
            'settings_related': 'client',
            'service_charge_list': 'service_charge',
            'project_list': 'project'
        },
        showPlusFor: {
            'home': true,
            'client_list': true,
            'project_list': true,
            'project_detail': true

        },
        position: 'bottom',
        components: [
            {name: 'plus', content: '<button class="plus-button" data-action="toggle"><div></div></button>', attachPoint: 'plusButtonNode'},
            {name: 'tabs', tag: 'div', attrs: {'class':'plus-tabs'}, attachPoint: 'tabContainerNode'},
            {name: 'status', tag: 'div', attrs: {'class':'plus-status'}, attachEvent: 'click: _onStatusClick', components: [
                {name: 'statusText', tag: 'span', attachPoint: 'statusTextNode'}
            ]},
            {name: 'popup', tag: 'div', attrs: {'class':'plus-popup'}, attachPoint: 'popupNode', components: [
                {name: 'container', tag: 'div', attrs: {'class':'plus-actions-container'}, components: [
                    {name: 'actions', tag: 'div', attrs: {'class':'plus-actions'}, attachPoint: 'actionContainerNode'},
                    {name: 'bottom', tag: 'div', attrs: {'class':'plus-actions-bottom'}}
                ]},
                {name: 'arrow', tag: 'div', attrs: {'class':'plus-popup-arrow'}}
            ]}

        ],
        baseClass: 'toolbar plus-bar',
        popupNode: null,
        plusButtonNode: null,
        tabContainerNode: null,
        actionContainerNode: null,

        _active: null,
        _animating: false,
        _open: false,
        _tabs: null,
        _actions: null,
        _onBodyClickCapture: null,

        clientDetailText: 'Client Detail',
        projectsText: 'Projects',
        ticketsText: 'Tickets',
        settingsText: 'Settings',
        byDraftsText: 'Drafts',
        byDateText: 'By Date',
        byProjectText: 'By Project',
        byClientText: 'By Client',
        newServiceTicketText: 'New Service Ticket',
        newClientText: 'New Client',
        newProjectText: 'New Project',

        _setStatusTextAttr: {node: 'statusTextNode', type: 'innerHTML'},
        _setStatusAttr: function(value) {
            this.set('statusText', value || '');

            domClass.toggle(this.domNode, 'has-status-text', !!value);
        },
        _createTabItems: function() {
            return [{
                name: 'client_detail',
                show: 'client_detail',
                args: resolveTransition(withCurrentState, true),
                label: this.clientDetailText,
                place: 'tabs',
                update: visibleForSet(this, 'client')
            },{
                name: 'project_related',
                show: 'project_related',
                args: resolveTransition(withCurrentState.bindDelegate(this, 'CustomerID eq ${0}'), true),
                label: this.projectsText,
                place: 'tabs',
                update: visibleForSet(this, 'client')
            },{
                name: 'service_charge_related',
                show: 'service_charge_related',
                args: resolveTransition(withCurrentState.bindDelegate(this, 'CustomerID eq ${0}', {groupBy: 'ServiceDate'}), true),
                label: this.ticketsText,
                place: 'tabs',
                update: visibleForSet(this, 'client')
            },{
                name: 'settings_related',
                show: 'settings_related',
                args: resolveTransition(withCurrentState.bindDelegate(this, 'CustomerID eq ${0}'), true),
                label: this.settingsText,
                place: 'tabs',
                update: visibleForSet(this, 'client')
            },{
                name: 'byDrafts_service_charge',
                show: 'service_charge_list',
                args: resolveTransition({
                    groupBy: 'Status'
                }),
                label: this.byDraftsText,
                place: 'tabs',
                update: visibleForSet(this, 'service_charge')
            },{
                name: 'byDate_service_charge',
                show: 'service_charge_list',
                args: resolveTransition({
                    groupBy: 'ServiceDate'
                }),
                label: this.byDateText,
                place: 'tabs',
                update: visibleForSet(this, 'service_charge')
            },{
                name: 'byProject_service_charge',
                show: 'service_charge_list',
                args: resolveTransition({
                    groupBy: 'Project.ProjectDescription'
                }),
                label: this.byProjectText,
                place: 'tabs',
                update: visibleForSet(this, 'service_charge')
            },{
                name: 'byClient_service_charge',
                show: 'service_charge_list',
                args: resolveTransition({
                    groupBy: 'Customer.CustomerName'
                }),
                label: this.byClientText,
                place: 'tabs',
                update: visibleForSet(this, 'service_charge')
            },{
                name: 'byProject_project',
                show: 'project_list',
                args: resolveTransition({
                    groupBy: 'ProjectDescription'
                }),
                label: this.byProjectText,
                place: 'tabs',
                update: visibleForSet(this, 'project')
            },{
                name: 'byClient_project',
                show: 'project_list',
                args: resolveTransition({
                    groupBy: 'Customer.CustomerName'
                }),
                label: this.byClientText,
                place: 'tabs',
                update: visibleForSet(this, 'project')
            },{
                name: 'byDate_project',
                show: 'project_list',
                args: resolveTransition({
                    groupBy: 'ProjectDate'
                }),
                label: this.byDateText,
                place: 'tabs',
                update: visibleForSet(this, 'project')
            }];
        },
        _createActionItems: function() {
            return [{
                name: 'new_service_charge',
                show: 'service_charge_edit',
                args: {
                    insert: true,
                    title: this.newServiceTicketText,
                    template: {}
                },
                label: this.newServiceTicketText,
                place: 'actions'
            },{
                name: 'new_client',
                show: 'add_client_contact',
                args: {
                    insert: true,
                    title: this.newClientText,
                    template: {}
                },
                label: this.newClientText,
                place: 'actions'
            },{
                name: 'new_project',
                show: 'project_edit',
                args: {
                    insert: true,
                    title: this.newProjectText,
                    template: {}
                },
                label: this.newProjectText,
                place: 'actions'
            }];
        },
        _place: function(item) {
            if (item.get('place') == 'tabs')
                item.placeAt(this.tabContainerNode);
            else
                item.placeAt(this.actionContainerNode);
        },
        _invokeCommand: function(item) {
            if (item.get('place') === 'actions')
            {
                domClass.remove(this.domNode, 'has-expanded-plus-actions');

                this._open = false;
            }

            this.inherited(arguments);

            this._active = item;
        },
        _setOpenAttr: function(value) {
            if (this._animating) return;
            if (this._open === value) return;

            this._animating = true;
            this._open = value;

            if (value)
            {
                domClass.add(this.domNode, 'has-expanded-plus-actions has-opening-plus-actions');
                domClass.add(this.domNode, 'has-expanded-plus-actions');
            }
            else
            {
                domClass.add(this.domNode, 'has-closing-plus-actions');
            }
        },
        _getOpenAttr: function() {
            return this._open;
        },
        /**
         *
         * @param [evt]
         * @param [node]
         */
        toggle: function(evt, node) {
            if (this._animating) return;

            this.set('open', !this._open);
        },
        _onAnimationEnd: function() {
            this._animating = false;

            if (this._open)
            {
                domClass.remove(this.domNode, 'has-opening-plus-actions');
            }
            else
            {
                domClass.remove(this.domNode, 'has-expanded-plus-actions has-closing-plus-actions');
            }
        },
        onStartup: function() {
            this.inherited(arguments);

            this._onBodyClickCapture = lang.hitch(this, this._onBodyClick);

            win.body().addEventListener('click', this._onBodyClickCapture, true);

            this.subscribe('/app/view/transition/before', this._onBeforeViewTransition);
            this.subscribe('/app/status/message', this._onStatusMessage);

            /* should this be directly bound to the element that is animating? */
            /* this may be causing the issue on the Chrome dev channel */
            this.connect(this.popupNode, animationEnd, this._onAnimationEnd);

            this._tabs = this._createTabItems();
            this._actions = this._createActionItems();

            /* comment to enable view customization of items */
            this.set('items', this._tabs.concat(this._actions));
        },
        onDestroy: function() {
            this.inherited(arguments);

            win.body().removeEventListener('click', this._onBodyClickCapture, true);

            delete this._onBodyClickCapture;

            delete this._tabs;
            delete this._actions;
            delete this._active;
        },
        _onBodyClick: function(evt, node) {
            if (this._animating) return;
            if (this._open)
            {
                evt = event.fix(evt);

                var contained = utility.contains(win.body(), evt.target) && !utility.contains(this.domNode, evt.target);
                if (contained)
                {
                    this.toggle();
                }
            }
        },
        _onStatusClick: function() {
            var status = this.get('statusText');
            if (!status) return;

            scene().showView('service_charge_list', {
                groupBy: 'Status'
            });
        },
        _onStatusMessage: function(message) {
            this.set('status', message);
        },
        _onBeforeViewTransition: function(view, previous, pane) {
            if (view && this.getParent() === pane)
            {
                var item = this._itemsByName[view.id];

                domClass.toggle(pane.domNode, 'has-expanded-plus-bar', !!this.viewToSet[view.id] || view.id == 'home');

                domClass.toggle(this.domNode, 'group-by-view', item);
                domAttr.set(this.domNode, 'data-view', (item && item.name) || '');

                domClass.toggle(this.plusButtonNode, 'is-hidden', !this.viewToSet[view.id] && !this.showPlusFor[view.id]);

                if (item) this._active = item;
            }
        }
        /* uncomment to enable view customization of items */
        /*
        _setItemsAttr: function(items) {
            var hasItemsInTabs,
                hasItemsInActions;

            if (items)
            {
                for (var i = 0; (i < items.length) && !hasItemsInActions && !hasItemsInTabs; i++)
                {
                    if (items[i].place == 'tabs') hasItemsInTabs = true;
                    if (items[i].place == 'actions') hasItemsInActions = true;
                }
            }

            if (items === false || (hasItemsInTabs && hasItemsInActions)) return this.inherited(arguments);

            if (hasItemsInTabs)
            {
                this.inherited(arguments, items.concat(this._actions));
            }
            else if (hasItemsInActions)
            {
                this.inherited(arguments, items.concat(this._tabs));
            }

            this.inherited(arguments, this._actions.concat(this._tabs));
        },
        */
    });

});
