var controllers = angular.module("controllers", []);

controllers.controller('TranslateController', ['$http', 'getLangCodes', '$scope', 'CONSTANTS',
                        function ($http, getLangCodes, $scope, CONSTANTS) {

        var MAX_LANGS = 5;
        var langsSelected = 0;

        $scope.langsMap = [];
        $scope.languagesLoaded = false;
        $scope.langsSelected = 0;

        getLangCodes("en").success(function (data) {
            for (var key in data.langs) {
                $scope.langsMap.push({
                    code: key,
                    name: data.langs[key],
                    selected: false
                });
            }
            $scope.languagesLoaded = true;
        }).error(function (error) {
            $scope.error = true;
        });

        $scope.toggleClass = function (language) {
            if (language.selected) {
                $scope.langsSelected--;
                language.selected = false;
                $scope.maxLangsMessage = false;
            } else if ($scope.langsSelected < MAX_LANGS) {
                $scope.langsSelected++;
                language.selected = true;
            } else {
                $scope.maxLangsMessage = true;
            }

        };

        $scope.refresh = function () {
            var id = window.setTimeout(function () {
                $scope.submit()
            }, 800);
            while (id--) {
                window.clearTimeout(id);
            }
        };

        $scope.submit = function () {
            $scope.translations = [];

            if (!$scope.input) $scope.noInputError = true;
            else $scope.noInputError = false;

            if ($scope.langsSelected == 0) $scope.noLangsError = true;
            else $scope.noLangsError = false;


            if (!$scope.noInputError && !$scope.noLangsERror) {

                angular.forEach($scope.langsMap, function (lang, key) {
                    if (lang.selected) {
                        var paramsList = {
                            lang: lang.code,
                            text: $scope.input
                        };
                        $http({
                            url: CONSTANTS.TRANSLATE_URL + CONSTANTS.API_KEY,
                            method: "GET",
                            params: paramsList
                        }).success(function (data) {
                            $scope.translations.push({
                                lang: lang.name,
                                text: data.text[0]
                            });
                        });
                    }
                });
            }

        };

}]);