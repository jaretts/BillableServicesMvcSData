define('Mobile/BillableServices/ActionBar', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'Sage/Platform/Mobile/TitleBar'
], function(
    declare,
    lang,
    string,
    TitleBar
) {

    return declare('Mobile.BillableServices.ActionBar', [TitleBar], {

        baseClass: 'toolbar action-toolbar',
        position: 'action',

        _getContextAttr: function() {
            if (this.context) return this.context;
            return  this.getComponentRoot();
        }
    });

});
