(function () {
    var app = angular.module('translate', ['angular-loading-bar', 'directives', 'controllers', 'variables']);

    app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.includeBar = false;
        cfpLoadingBarProvider.latencyThreshold = 0;
    }]);

    app.factory('getLangCodes', ['$http', 'CONSTANTS', function ($http, CONSTANTS) {
        return function (uilang) {
            return $http({
                url: CONSTANTS.LANGS_URL + CONSTANTS.API_KEY,
                method: "GET",
                params: {
                    ui: uilang
                }
            });
        };
    }]);

    app.run( ['$rootScope', 'CONSTANTS', function ($rootScope, CONSTANTS) {
        $rootScope.CONSTANTS = CONSTANTS;
    }]);

})();