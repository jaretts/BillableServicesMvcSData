define('configuration/production', ['Mobile/BillableServices/ApplicationModule'], function(ApplicationModule) {

    return {
        modules: [
            new ApplicationModule()
        ],
        connections: {
            /*
            'cloud': {
                isDefault: true,
                offline: true,
                url: 'http://sageapi.cloudapp.net/sdata/billserv/billserv/-/',
                json: true
            }
            */
            'cloud': {
                isDefault: true,
                offline: true,
                serverName: window.location.hostname,
                virtualDirectory: 'sdata',
                applicationName: 'billserv',
                contractName: 'billserv',
                port: window.location.port && window.location.port != 80 ? window.location.port : false,
                protocol: /https/i.test(window.location.protocol) ? 'https' : false,
                json: true
            }
        }
    };

});