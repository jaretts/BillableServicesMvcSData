define('Mobile/BillableServices/Views/Home', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/Deferred',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'dojo/topic',
    'dojo/string',
    'dojo/store/Memory',
    'Sage/Platform/Mobile/_CommandMixin',
    'Sage/Platform/Mobile/View',
    'Sage/Platform/Mobile/Store/SData',
    'Sage/Platform/Mobile/Charts/ColumnChart',
    '../Charts/BillableTheme',
    '../Format',
    'argos!application',
    'argos!scene',
    'argos!customizations'
], function(
    declare,
    array,
    lang,
    Deferred,
    domAttr,
    domConstruct,
    domGeometry,
    domStyle,
    topic,
    string,
    Memory,
    _CommandMixin,
    View,
    SData,
    ColumnChart,
    BillableTheme,
    format,
    application,
    scene,
    customizations
) {
    var today = moment(),
        emptyChartData = [
            { ServiceDate: today.toDate(), Amount: 0 },
            { ServiceDate: today.clone().subtract('days', 1).toDate(), Amount: 0 },
            { ServiceDate: today.clone().subtract('days', 2).toDate(), Amount: 0 },
            { ServiceDate: today.clone().subtract('days', 3).toDate(), Amount: 0 },
            { ServiceDate: today.clone().subtract('days', 4).toDate(), Amount: 0 },
            { ServiceDate: today.clone().subtract('days', 5).toDate(), Amount: 0 },
            { ServiceDate: today.clone().subtract('days', 6).toDate(), Amount: 0 },
            { ServiceDate: today.clone().subtract('days', 7).toDate(), Amount: 0 }
        ];
    var chartOptions = {
        cls: 'home-chart',
        theme: BillableTheme,
        customLabels: true,
        ratio: false,
        resourceKind: 'userChargesDaily',
        queryWhere: filterByUser,
        descriptionProperty: 'ServiceDate',
        valueProperty: 'Amount',
        minorTickDivisions: 2,
        majorTickDivisions: 4,
        yAxis: {
            vertical: true,
            fixLower: 'major',
            fixUpper: 'major',
            showTicks: false,
            minorLabels: false,
            labelFunc: function(val) {
                var numberedText = format.numberToText(val);
                return format.currency(numberedText[0], (numberedText[0] % 1 > 0) ? 1 : 0) + numberedText[1];
            }
        },
        xAxis: {
            natural: true,
            showTicks: false
        },
        grid: {
            hMajorLines: true,
            hMinorLines: true,
            vMajorLines: false
        },
        click: function(evt) {
            if (!evt.index) return;

            var daysToSubtract = Math.abs(evt.index-7),
                targetDate = moment().utc().subtract('days', daysToSubtract);

            scene().showView('service_charge_list', {
                where: string.substitute('ServiceDate between @${0}@ and @${1}@', [
                    targetDate.clone().format('YYYY-MM-DDT00:00:00Z'),
                    targetDate.clone().format('YYYY-MM-DDT23:59:59Z')
                ]),
                groupBy: 'Project.ProjectDescription'
            });
        },
        processFeed: function(feed) {
            if (feed.length <= 0)
                feed = emptyChartData;

            for (var i = 0; i < feed.length; i++)
            {
                var dateText = format.date(feed[i]['ServiceDate'], 'ddd', true),
                    dateIndex = dateText === 'Thu' || dateText === 'Tue' ? 2 : 1;
                feed[i]['ServiceDate'] = dateText.substr(0, dateIndex);
            }
            this.feed = feed;
        }
    };

    return declare('Mobile.BillableServices.Views.Home', [View, _CommandMixin], {
        events: {
            'click': true
        },
        components: [
            {name: 'container', tag: 'div', attrs: {'class': 'home-container'}, attachPoint: 'contentNode', components: [
                {name: 'nav', tag: 'div', attrs: {'class': 'home-navigation'}, attachPoint: 'navigationNode'},
                {name: 'chart', type: ColumnChart,  props: chartOptions, attachPoint: 'chartNode'}
            ]}
        ],
        baseClass: 'view home',

        navigationItemTemplate: new Simplate([
            '<div class="home-navigation-item" data-name="{%= $.name %}">',
            '{% if ($.icon) { %}',
            '<img src="{%: $.icon %}" alt="icon" class="icon" /><br />',
            '{% } %}',
            '<span>{%: $.title %}</span>',
            '</div>'
        ]),

        id: 'home',
        tier: 0,
        columnCount: 2,
        customizationSet: 'home',
        navigationNode: null,

        titleText: 'SC',
        clientsText: 'Clients',
        projectsText: 'Projects',
        historyText: 'My Tickets',
        serviceChargesText: 'New Ticket',
        newServiceChargeText: 'New Service Ticket',
        draftStatusText: 'You have ${0} draft service tickets.',

        onStartup: function() {
            this.inherited(arguments);

            this.createNavigation();
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                top: [{
                    name: 'menu',
                    place: 'left',
                    publish: '/app/navigation/expand/toggle'
                }]
            });
        },
        onTransitionTo: function() {
            this.inherited(arguments);

            this.requestDraftData();
            this.$.chart.refresh();
        },
        onBeforeTransitionAway: function() {
            this.inherited(arguments);

            topic.publish('/app/status/message', '');
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                'name': 'client_list',
                'show': 'client_list',
                //'icon': 'content/images/icons/clients-icon.png',
                'title': this.clientsText
            },{
                'name': 'project_list',
                'show': 'project_list',
                //'icon': 'content/images/icons/projects-icon.png',
                'title': this.projectsText
            },{
                'name': 'service_charge_list',
                'show': 'service_charge_list',
                //'icon': 'content/images/icons/history-icon.png',
                'title': this.historyText
            },{
                'name': 'service_charge_edit',
                'show': 'service_charge_edit',
                'args': {insert: true, template: {}, title: this.newServiceChargeText},
                //'icon': 'content/images/icons/service-charges-icon.png',
                'title': this.serviceChargesText
            }]);
        },
        refreshRequiredFor: function(options) {
            return this.inherited(arguments);
        },
        createNavigation: function() {
            var layout = customizations().apply(customizations().toPath(this.customizationSet, 'home', this.id), this.createLayout()),
                columnCount = this.columnCount,
                rowCount = Math.ceil(layout.length / columnCount),
                tableNode = domConstruct.create('table', {
                    'class': 'home-navigation-table'
                }, this.navigationNode),
                tableBodyNode = domConstruct.create('tbody', null, tableNode),
                tableRowNode,
                tableCellNode;

            this.layout = layout;

            this._commandsByName = {};

            for (var i = 0; i < rowCount; i++)
            {
                tableRowNode = domConstruct.create('tr', {
                    'class': 'home-navigation-row'
                }, tableBodyNode);

                for (var j = 0; j < columnCount; j++)
                {
                    var item = layout[i*columnCount + j];
                    if (item)
                    {
                        this._commandsByName[item.name] = item;

                        tableCellNode = domConstruct.create('td', {
                            'class': 'home-navigation-cell',
                            'data-action': 'invoke',
                            'data-command': item.name
                        }, tableRowNode);

                        domConstruct.place(this.navigationItemTemplate.apply(item, this), tableCellNode);
                    }
                    else
                    {
                        tableCellNode = domConstruct.create('td', {
                            'class': 'home-navigation-cell home-navigation-empty'
                        }, tableRowNode);
                    }
                }
            }
        },
        refresh: function() {
            /* this.requestDraftData(); */
        },
        requestDraftData: function() {
            var self = this,
                store = new SData({
                service: this.getConnection(),
                resourceKind: 'serviceCharges'
            });

            var queryResults = store.query('Status eq 4 and UserID eq '+application().context['user']['UserID'], {count: 0});
            Deferred.when(queryResults, function(items) {
                topic.publish('/app/status/message', string.substitute(self.draftStatusText, [queryResults.total]));
            });
        },
        resize: function() {
            this.inherited(arguments);

            if (this.$.chart)
                this.$.chart.resize();

            /*
            var containerStyle = domStyle.getComputedStyle(this.contentNode),
                marginBox = domGeometry.getMarginBox(this.contentNode, containerStyle);
            */
        }
    });
});
