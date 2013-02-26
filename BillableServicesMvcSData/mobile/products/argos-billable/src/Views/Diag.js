define('Mobile/BillableServices/Views/Diag', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'dojo/string',
    'dojo/store/Memory',
    'Sage/Platform/Mobile/Detail',
    'Sage/Platform/Mobile/ScrollContainer'
], function(
    declare,
    array,
    lang,
    win,
    domAttr,
    domConstruct,
    domGeometry,
    domStyle,
    string,
    Memory,
    Detail,
    ScrollContainer
) {
    return declare('Mobile.BillableServices.Views.Diag', [Detail], {
        id: 'diag',
        tier: 1,

        components: [
            {name: 'fix', content: '<a href="#" class="android-6059-fix">fix for android issue #6059</a>'},
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', props: {enableFormFix:true}, components: [
                {name: 'scroll', tag: 'div', components: [
                    {name: 'inputA', tag: 'input', attachPoint: 'inputANode'},
                    {name: 'content', tag: 'div', attrs: {'class': 'detail-content'}, attachPoint: 'contentNode'},
                    {name: 'inputB', tag: 'input', attachPoint: 'inputBNode'}
                ]}
            ]}
        ],

        _last: null,

        onStartup: function() {
            this.inherited(arguments);

            this.connect(window, 'onresize', this._onWindowResize);
            this.connect(window, 'onorientationchange', this._onWindowOrientationChange);

            /*
            var count = 0;
            setInterval(lang.hitch(this, function() {
                this._last = 'timer ' + count++;

                this.clear();
                this.refresh();
            }), 1000);
            */
        },
        _onWindowResize: function() {
            this._last = 'resize';

            this.clear();
            this.refresh();
        },
        _onWindowOrientationChange: function() {
            this._last = 'orient';

            this.clear();
            this.refresh();
        },
        _collectData: function() {
            var store = this.get('store'),
                source = this._last;

            this._last = null;

            store.put({
                id: 1,
                pageYOffset: window.pageYOffset,
                winScrollY: window.scrollY,
                docScrollTop: document.documentElement.scrollTop,
                bodyScrollTop: win.body().scrollTop,
                bodyWidth: win.body().clientWidth,
                bodyHeight: win.body().clientHeight,
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth,
                screenWidth: screen.width,
                screenHeight: screen.height,
                source: source || 'other'
            });
        },
        _buildGetExpression: function() {
            return 1;
        },
        _requestData: function() {
            this._collectData();

            this.inherited(arguments);
        },
        createStore: function() {
            return new Memory({
                idProperty: 'id',
                data: []
            });
        },
        createLayout: function() {
            return this.layout || (this.layout = {
                title: false,
                name: 'DetailSections',
                cls: 'detail-inner',
                children: [{
                    label: 'page Y off',
                    property: 'pageYOffset'
                },{
                    label: 'win srcl Y',
                    property: 'winScrollY'
                },{
                    label: 'doc scrl top',
                    property: 'docScrollTop'
                },{
                    label: 'body scrl top',
                    property: 'bodyScrollTop'
                },{
                    label: 'body W',
                    property: 'bodyWidth'
                },{
                    label: 'body H',
                    property: 'bodyHeight'
                },{
                    label: 'window W',
                    property: 'windowWidth'
                },{
                    label: 'window H',
                    property: 'windowHeight'
                },{
                    label: 'screen W',
                    property: 'screenWidth'
                },{
                    label: 'screen H',
                    property: 'screenHeight'
                },{
                    label: 'source',
                    property: 'source'
                }]
            });
        }
    });
});
