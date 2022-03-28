var controllers = angular.module("controllers", []);

controllers.controller('TranslateController', ['$http', 'getLangCodes', '$scope', 'CONSTANTS',
                        function ($http, getLangCodes, $scope, CONSTANTS) {

    $scope.langsMap = [];
    $scope.langsSelected = [];
    $scope.languagesLoaded = false;
                        
    $(window).on("beforeunload", function() { 
        $scope.exit();
    });
                        
    $(window).ready(function() {
        $scope.initialize();
    });

    $scope.initialize = function (language) {
        var langsSelectedSaved = localStorage.getItem("langsSelectedSaved");
        var langsMapSaved = localStorage.getItem("langsMapSaved");
        
        if (langsMapSaved) {
            //if langsMapSaved exists from previous session
            $scope.languagesLoaded = true;
            $scope.langsSelected = JSON.parse(langsSelectedSaved);
            $scope.langsMap = JSON.parse(langsMapSaved);
        } else {
            // fresh initialization: bring down list of all available language translations
            getLangCodes('en').success(function (data) {
                data.forEach(obj => {
                    $scope.langsMap.push({
                        code: obj.code,
                        name: obj.name,
                        selected: false
                    });
                })
                //show the main interface only once the page has loaded
                $scope.languagesLoaded = true;
            }).error(function (error) {
                $scope.error = true;
            });
        } 
    };
                        
    $scope.exit = function() {
        if ($scope.langsSelected != null) {
            localStorage.setItem('langsSelectedSaved', angular.toJson($scope.langsSelected));
        }
        if ($scope.langsMap != null) {
            localStorage.setItem('langsMapSaved', angular.toJson($scope.langsMap));
        }
    };   

    $scope.toggleClass = function (language) {
        if (language.selected) {
            language.selected = false;
            $scope.maxLangsMessage = false;
            
            var obj = $scope.langsSelected.filter(function (obj) {
                return obj.name === language.name;
            })[0];

            $scope.langsSelected.splice($.inArray(obj, $scope.langsSelected), 1);
            
        } else if ($scope.langsSelected.length < CONSTANTS.MAX_LANGS) {
            language.selected = true;
            $scope.langsSelected.push({name: language.name, text: '...'});
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
        if (!$scope.input) {
            $scope.noInputError = true;
        }
        else {
            $scope.noInputError = false;
        }

        if ($scope.langsSelected.length == 0) {
            $scope.noLangsError = true;
        }
        else {
            $scope.noLangsError = false;
        }

        if (!$scope.noInputError && !$scope.noLangsError) {
            angular.forEach($scope.langsSelected, function (lang) {
                // look up the code of selected language in langsMap
                var code = $scope.langsMap.filter(function ( obj ) {
                    return obj.name === lang.name;
                })[0].code;

                // get translation
                $http({
                    url: CONSTANTS.TRANSLATE_URL,
                    method: 'POST',
                    params: { source: 'en', target: code, q: $scope.input}
                }).success(function (data) {
                    //set translation text variable
                    lang.text = data.translatedText
                });
            });
        }
    };
}]);