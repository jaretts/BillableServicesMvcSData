define('Mobile/BillableServices/Views/Signature', [
    'dojo/_base/declare',
    'dojo/dom-geometry',
    'Sage/Platform/Mobile/Views/Signature',
    'Sage/Platform/Mobile/ScrollContainer',
    '../ActionBar'
], function(
    declare,
    domGeom,
    SignatureView,
    ScrollContainer,
    ActionBar
) {
    return declare('Mobile.BillableServices.Views.Signature', [SignatureView], {
        // Localization
        clearCanvasText: 'Clear Signature',

        //Templates
        components: [
            {name: 'fix', content: '<a href="#" class="android-6059-fix">fix for android issue #6059</a>'},
            {name: 'canvas-container', tag: 'div', components: [
                {name: 'canvas', tag: 'canvas', attrs: {'class': 'signature-canvas', width: 360, height: 120}, attachPoint: 'signatureNode', attachEvent: 'onmousedown:_penDown,onmousemove:_penMove,onmouseup:_penUp,ontouchstart:_penDown,ontouchmove:_penMove,ontouchend:_penUp'}
            ]},
            {name: 'action', attachPoint: 'toolbars.action', type: ActionBar, props: {managed: true}}
        ],

        createToolLayout: function() {
            return this.tools || (this.tools = {
                action: [{
                    name: 'clear',
                    baseClass: 'button destructive-button',
                    label: this.clearCanvasText,
                    action: 'clearValue',
                    place: 'full',
                    scope: this
                }]
            });
        },

        calculateWidth: function() {
            var box = domGeom.getContentBox(this.signatureNode.parentNode);
            return (box.w * .92);
        },
        calculateHeight: function() {
            return domGeom.getContentBox(this.domNode).h - 91;
        }
    });
});