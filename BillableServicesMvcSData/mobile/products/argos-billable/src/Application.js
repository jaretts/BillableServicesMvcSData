/* todo: move to filter set */
function filterByTenant() {
    return 'TenantID eq ' + window.App.context['user']['TenantID'];
}
function filterByUser() {
    return 'UserID eq ' + window.App.context['user']['UserID'];
}

define('Mobile/BillableServices/Application', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/connect',
    'dojo/_base/json',
    'dojo/_base/lang',
    'dojo/_base/sniff',
    'dojo/has',
    'dojo/string',
    'Sage/Platform/Mobile/Application',
    'Sage/Platform/Mobile/CustomizationSet',
    './ApplicationScene'
], function(
    declare,
    array,
    connect,
    json,
    lang,
    sniff,
    has,
    string,
    Application,
    CustomizationSet,
    ApplicationScene
) {
    return declare('Mobile.BillableServices.Application', [Application], {
        components: [
            {type: ApplicationScene, attachPoint: 'scene'},
            {type: CustomizationSet, attachPoint: 'customizations'}
        ],
        startup: function() {
            if (has('ie') && has('ie') < 9) window.location.href = 'unsupported.html';

            this.inherited(arguments);
        },
        run: function() {
            this.inherited(arguments);

            this.scene.showView('login');
            return;

            if (App.isOnline() || !App.enableCaching)
            {
                this.handleAuthentication();
            }
            else
            {
                this.navigateToHomeView();
            }
        },
        onAuthenticateUserSuccess: function(credentials, options, result) {
            var user = result['$resources'][0];

            if (!user)
            {
                this.onAuthenticateUserFailure(options, {status: 403});
                return;
            }

            this.context['user' ] = user;

            if (credentials.remember)
            {
                try
                {
                    if (window.localStorage)
                        window.localStorage.setItem('credentials', Base64.encode(json.toJson({
                            username: credentials.username,
                            password: credentials.password || ''
                        })));
                }
                catch (e) { }
            }

            if (options.success)
                options.success.call(options.scope || this, {user: user});
        },
        onAuthenticateUserFailure: function(options, response, ajax) {
            var service = this.getConnection();
            if (service)
                service
                    .setUserName(false)
                    .setPassword(false);

            if (options.failure)
                options.failure.call(options.scope || this, {response: response});
        },
        authenticateUser: function(credentials, options) {
            var service = this.getConnection()
                .setUserName(credentials.username)
                .setPassword(credentials.password || '');

            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                .setResourceKind('users')
                .setQueryArg('where', '(UserName eq \'' + credentials.username + '\')');

            request.read({
                success: lang.hitch(this, this.onAuthenticateUserSuccess, credentials, options),
                failure: lang.hitch(this, this.onAuthenticateUserFailure, options),
                scope: this
            });
        },
        hasAccessTo: function(security) {
            return true;
        },
        reload: function() {
            window.location.reload();
        },
        logOut: function() {
            if (window.localStorage)
            {
                window.localStorage.removeItem('credentials');
                window.localStorage.removeItem('navigationState');
            }

            var service = this.getConnection();
            if (service)
                service
                    .setUserName(false)
                    .setPassword(false);

            this.reload();
        },
        handleAuthentication: function() {
            try
            {
                if (window.localStorage)
                {
                    var stored = window.localStorage.getItem('credentials'),
                        encoded = stored && Base64.decode(stored),
                        credentials = encoded && json.fromJson(encoded);
                }
            }
            catch (e) { }

            if (credentials)
            {
                this.authenticateUser(credentials, {
                    success: function(result) {
                        this.requestUserDetails();
                        this.navigateToInitialView();
                    },
                    failure: function(result) {
                        this.navigateToLoginView();
                    },
                    aborted: function(result) {
                        this.navigateToLoginView();
                    },
                    scope: this
                });
            }
            else
            {
                this.navigateToLoginView();
            }
        },
        _clearNavigationState: function() {
            try
            {
                if (window.localStorage)
                    window.localStorage.removeItem('navigationState');
            }
            catch (e) { }
        },
        _loadNavigationState: function() {
            try
            {
                if (window.localStorage)
                    this.navigationState = window.localStorage.getItem('navigationState');
            }
            catch (e) { }
        }
    });
});