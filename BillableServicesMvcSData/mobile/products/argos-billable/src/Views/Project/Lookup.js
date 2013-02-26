define('Mobile/BillableServices/Views/Project/Lookup', [
    'dojo/_base/declare',
    'dojo/string',
    './List',
    'Sage/Platform/Mobile/ScrollContainer',
    'Sage/Platform/Mobile/SearchWidget',
    'Sage/Platform/Mobile/Message',
    'argos!scene'
], function(
    declare,
    string,
    ProjectList,
    ScrollContainer,
    SearchWidget,
    message,
    scene
) {

    return declare('Mobile.BillableServices.Views.Project.Lookup', [ProjectList], {
        // Localization
        insertText: 'Create New Project',
        cancelText: 'Cancel',

        //View Properties
        id: 'project_lookup',
        insertView: 'project_edit',
        saving: null,
        components: [
            {name: 'search', type: SearchWidget, attachEvent: 'onQuery:_onSearchQuery,onClear:_onSearchClear'},
            {name: 'fix', content: '<a href="#" class="android-6059-fix">fix for android issue #6059</a>'},
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', components: [
                {name: 'scroll', tag: 'div', components: [
                    {name: 'empty', tag: 'div', attrs: {'class': 'list-empty'}, attachPoint: 'emptySelectionNode', components: [
                        {name: 'emptyButton', content: Simplate.make('<button class="button" data-action="emptySelection"><span>{%: $.emptySelectionText %}</span></button>')}
                    ]},
                    {name: 'add', content: Simplate.make('<div data-action="navigateToInsertView" data-type="{%= $.resourceKind %}" class="row-insert"><span>{%: $.insertText %}</span></div>')},
                    {name: 'content', tag: 'ul', attrs: {'class': 'list-content'}, attachPoint: 'contentNode'},
                    {name: 'more', tag: 'div', attrs: {'class': 'list-more'}, components: [
                        {name: 'moreRemaining', tag: 'span', attrs: {'class': 'list-remaining'}, attachPoint: 'remainingContentNode'},
                        {name: 'moreButton', content: Simplate.make('<button class="button" data-action="more"><span>{%: $.moreText %}</span></button>')}
                    ]}
                ]}
            ]}
        ],

        /* todo: this should chain it's own notify (for onValue) */
        /* instead of passing tools, the view should know which set of tools to show? or how to handle? */
        /* that way we don't have complete doing validation work */
        navigateToInsertView: function() {
            var changes = {};
            if (this.options && this.options.dependentValue)
                changes['Customer'] = {
                    CustomerID: this.options.dependentValue['CustomerID'] || this.options.dependentValue['$key'],
                    CustomerName: this.options.dependentValue['CustomerName']
                };

            scene().showView(this.insertView || this.editView, {
                insert: true,
                changes: changes,
                title: this.insertText,
                tools: {
                    top: [{
                        name: 'complete',
                        cls: 'complete',
                        label: 'Ok',
                        fn: this.complete,
                        scope: this
                    },{
                        name: 'cancel',
                        place: 'left',
                        label: this.cancelText,
                        publish: '/app/scene/back'
                    }]
                }
            }, null, {
                returnTo: -1
            });
        },
        _onRefresh: function(message) {
            this.inherited(arguments);

            if (this.saving && (message && message.resourceKind === 'projects'))
                this._onComplete(message.data);
        },

        complete: function(view, item) {
            this.saving = true;
            view.save();
        },
        _onComplete: function(item) {
            if (this.options.notifyOnSelection)
            {
                message.send(this.options.notifyOnSelection, 'onSelection', [item]);
            }
            this.saving = false;
        }
    });
});