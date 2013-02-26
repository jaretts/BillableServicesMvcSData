define('Mobile/BillableServices/ApplicationLayout', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/has',
    'dojo/topic',
    'dojo/dom-class',
    'Sage/Platform/Mobile/Layout',
    'Sage/Platform/Mobile/Pane',
    'Sage/Platform/Mobile/Utility',
    './TitleBar',
    './PlusBar',
    './QuickNav'
], function(
    declare,
    array,
    lang,
    event,
    has,
    topic,
    domClass,
    Layout,
    Pane,
    utility,
    TitleBar,
    PlusBar,
    QuickNav
) {
    return declare('Mobile.BillableServices.ApplicationLayout', [Layout], {
        tiers: 1,
        maximized: 0,
        components: [
            {name: 'navigation', type: QuickNav, attachEvent: 'onExpandChange:_onNavigationExpandChange', props:{'class':'layout-left'}},
            {name: 'list', root: true, type: Pane, attachPoint: 'panes.list', props:{'class':'layout-center', tier: 0}, components: [
                {name: 'top', type: TitleBar, attachEvent: 'onPositionChange:_onToolbarPositionChange', props: {managed: true, visible: false}},
                {name: 'container', tag: 'div', attrs: {'class': 'view-container'}, attachPoint: 'viewContainerNode'},
                {name: 'bottom', type: PlusBar, attachEvent: 'onPositionChange:_onToolbarPositionChange'}
            ]}
        ],

        _onClickCapture: null,

        onStartup: function() {
            this.inherited(arguments);

            /* if (has('tablet-format')) this.maximized = -1; */

            this._onClickCapture = lang.hitch(this, this._onClick);

            this.domNode.addEventListener('click', this._onClickCapture, true);
        },
        onDestroy: function() {

            this.domNode.removeEventListener('click', this._onClickCapture, true);

            delete this._onClickCapture;
        },
        _onNavigationExpandChange: function() {
            this.resize();
        },
        _onClick: function(evt) {
            var navigation = this.$.navigation;
            if (navigation.get('expanded'))
            {
                evt = event.fix(evt);

                var contained = utility.contains(this.domNode, evt.target) && !utility.contains(navigation.domNode, evt.target);
                if (contained)
                {
                    navigation.toggle();

                    event.stop(evt);
                }
            }
        }
    });
});