define('configuration/development', ['Mobile/BillableServices/ApplicationModule'], function(ApplicationModule) {

    return {
        modules: [
            new ApplicationModule()
        ],
        connections: {
            'cloud': {
                isDefault: true,
                offline: true,
                //url: 'http://sageapi.cloudapp.net/sdata/billserv/billserv/-/',
                url: 'http://127.0.0.1:81/sdata/billserv/billserv/-/',
                json: true
            }        
        }
    };

});