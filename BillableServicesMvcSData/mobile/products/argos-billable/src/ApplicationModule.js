define('Mobile/BillableServices/ApplicationModule', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/ApplicationModule',
    'Sage/Platform/Mobile/Charts/_Chart',
    'Sage/Platform/Mobile/_SDataListMixin',
    './ApplicationViews',
    './WithMockData'
], function(
    declare,
    lang,
    ApplicationModule,
    _Chart,
    _SDataListMixin,
    ApplicationViews,
    WithMockData
) {

    return declare('Mobile.BillableServices.ApplicationModule', [ApplicationModule], {
        loadViews: function(scene) {
            this.inherited(arguments);

            scene.registerViews(ApplicationViews);
        },
        loadCustomizations: function() {
            var mixin = new _SDataListMixin();
            lang.extend(_Chart, {
                createStore: mixin.createStore,
                _buildQueryExpression: mixin._buildQueryExpression,
                _applyStateToQueryOptions: mixin._applyStateToQueryOptions
            });

            /*
            this.loadBaseCustomizations();
            */
            //WithMockData();
        }
    });

});
