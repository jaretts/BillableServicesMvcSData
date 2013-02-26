define('Mobile/BillableServices/TitleBar', [
    'dojo/_base/declare',
    'dojo/dom-class',
    'Sage/Platform/Mobile/TitleBar'
], function(
    declare,
    domClass,
    TitleBar
) {
    return declare('Mobile.BillableServices.TitleBar', [TitleBar], {

        homeView: 'home',
        rootViews: {
            'client_list': true,
            'project_list': true,
            'service_charge_list': true
        },

        titleText: 'Billable Services',

        onStartup: function() {
            this.inherited(arguments);

            this.subscribe('/app/view/transition/before', this._onBeforeViewTransition);
        },

        _setItemsAttr: function(items) {
            var hasItemsOnLeft;

            if (items)
            {
                for (var i = 0; i < items.length; i++)
                {
                    if (items[i].place == 'left')
                    {
                        hasItemsOnLeft = true;
                        break;
                    }
                }
            }

            if (hasItemsOnLeft || items === false) return this.inherited(arguments);

            var pane = this.getParent(),
                active = pane && pane.active;
            if (active && active.id != this.homeView)
            {
                if (this.rootViews[active.id])
                {
                    items = (items || []).concat([{
                        name: 'menu',
                        place: 'left',
                        publish: '/app/navigation/expand/toggle'
                    }]);
                }
                else
                {
                    items = (items || []).concat([{
                        name: 'back',
                        place: 'left',
                        publish: '/app/scene/back'
                    }]);
                }
            }

            this.inherited(arguments);
        },

        _onBeforeViewTransition: function(view, previous, pane) {
            if (view && this.getParent() === pane)
            {
                domClass.toggle(this.domNode, 'has-title-icon', view.id == 'home');
                domClass.toggle(this.domNode, 'has-title-full', view.id == 'login');
            }
        }
    });
});