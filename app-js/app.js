(function () {
    var app = angular.module('translate', ['angular-loading-bar', 'directives', 'controllers', 'variables']);

    app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.latencyThreshold = 500;
    }]);

    app.factory('getLangCodes', ['$http', 'CONSTANTS', function ($http, CONSTANTS) {
        return function (uilang) {
            return $http({
                url: CONSTANTS.LANGS_URL,
                method: "GET",
                params: { ui: uilang }
            });
        };
    }]);

    app.run( ['$rootScope', 'CONSTANTS', function ($rootScope, CONSTANTS) {
        $rootScope.CONSTANTS = CONSTANTS;
    }]);

})();