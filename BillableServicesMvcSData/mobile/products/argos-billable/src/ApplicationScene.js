define('Mobile/BillableServices/ApplicationScene', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/Scene',
    './ApplicationLayout'
], function(
    declare,
    lang,
    Scene,
    ApplicationLayout
) {
    return declare('Mobile.BillableServices.ApplicationScene', [Scene], {
        components: [
            {type: ApplicationLayout, attachPoint: 'layout'}
        ]
    });
});