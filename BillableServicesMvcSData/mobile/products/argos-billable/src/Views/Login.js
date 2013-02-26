define('Mobile/BillableServices/Views/Login', [
    'dojo/_base/declare',
    'dojo/dom-class',
    'dojo/_base/window',
    'Sage/Platform/Mobile/Edit',
    'Sage/Platform/Mobile/ScrollContainer',
    '../ActionBar',
    'argos!scene',
    'argos!application'
], function(
    declare,
    domClass,
    win,
    Edit,
    ScrollContainer,
    ActionBar,
    scene,
    application
) {

    return declare('Mobile.BillableServices.Views.Login', [Edit], {
        //Templates
        components: [
            {name: 'fix', content: '<a href="#" class="android-6059-fix">fix for android issue #6059</a>'},
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', props: {enableFormFix: true}, components: [
                {name: 'scroll', tag: 'div', components: [
                    {name: 'loading', content: Simplate.make('<div class="loading-indicator"><div>{%: $.loadingText %}</div></div>')},
                    {name: 'validation', tag: 'div', attrs: {'class': 'validation-summary'}, components: [
                        {name: 'validationTitle', content: Simplate.make('<h2>{%: $.validationSummaryText %}</h2>')},
                        {name: 'validationContent', tag: 'ul', attachPoint: 'validationContentNode'}
                    ]},
                    {name: 'content', tag: 'div', attrs: {'class': 'edit-content'}, attachPoint: 'contentNode'},
                    {name: 'action', attachPoint: 'toolbars.action', type: ActionBar, props: {managed: true}}
                ]}
            ]}
        ],

        //Localization
        copyrightText: '&copy; 2012 Sage Software, Inc. All rights reserved.',
        logOnText: 'LOGIN',
        passText: 'Password',
        titleText: 'Service Charger',
        userText: 'User Name',
        invalidUserText: 'The user name or password is invalid.',
        missingUserText: 'The user record was not found.',
        serverProblemText: 'A problem occurred on the server.',
        requestAbortedText: 'The request was aborted.',

        id: 'login',
        tier: 0,
        busy: false,

        createToolLayout: function() {
            return this.tools || (this.tools = {
                top: false,
                action: [{
                    name: 'login',
                    baseClass: 'button action-button',
                    label: this.logOnText,
                    action: 'authenticate',
                    place: 'full',
                    scope: this
                }]
            });
        },
        getContext: function() {
            return {view: this.id};
        },
        load: function() {
            this.inherited(arguments);

            this.fields['username'].setValue('Sage100User');
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'username',
                    label: this.userText,
                    type: 'text'
                },
                {
                    name: 'password',
                    label: this.passText,
                    type: 'text',
                    inputType: 'password'
                }
            ]);
        },
        authenticate: function () {
            if (this.busy) return;

            var credentials = this.getValues(),
                username = credentials && credentials.username;

            if (username && /\w+/.test(username))
                this.validateCredentials(credentials);
        },
        validateCredentials: function (credentials) {
            this.disable();

            application().authenticateUser(credentials, {
                success: function(result) {
                    this.enable();
                    domClass.remove(win.body(), 'has-hidden-plus-bar');
                    scene().showView('home');
                },
                failure: function(result) {
                    this.enable();

                    if (result.response)
                    {
                        if (result.response.status == 403)
                            alert(this.invalidUserText);
                        else
                            alert(this.serverProblemText);
                    }
                    else
                    {
                        alert(this.missingUserText);
                    }
                },
                aborted: function(result) {
                    this.enable();

                    alert(this.requestAbortedText);
                },
                scope: this
            });
        }
    });
});