var controllers = angular.module("controllers", []);

controllers.controller('TranslateController', 
                       [ '$http', 'getLangCodes', '$scope', 'CONSTANTS', 
                        function($http, getLangCodes, $Scope, CONSTANTS) {
    
    var MAX_LANGS = 5;
    var langsSelected = 0;

    var translateCtrl = this;

    translateCtrl.langsMap = [];
    translateCtrl.languagesLoaded = false;
    translateCtrl.langsSelected = 0;

    getLangCodes("en").success(function(data) {
        for (var key in data.langs) {
            translateCtrl.langsMap.push({
                code: key,
                name: data.langs[key],
                selected: false
            });
        }
        //translateCtrl.langsMap = data.langs;
        translateCtrl.languagesLoaded = true;
    }).error(function(error) {
        translateCtrl.error = true;
    });

    this.toggleClass = function(language) {
        if (language.selected) {
            translateCtrl.langsSelected--;
            language.selected = false;
            translateCtrl.maxLangsMessage = false;
        }
        else if (translateCtrl.langsSelected < MAX_LANGS) {
                translateCtrl.langsSelected++;
                language.selected = true;
        }
        else {
            translateCtrl.maxLangsMessage = true;
        }  

    };

    this.refresh = function() {
        var id = window.setTimeout(function() {
            translateCtrl.submit() },800);
        while (id--) {
            window.clearTimeout(id);
        }  
    };

    this.submit = function() {       
        translateCtrl.translations = [];

        if (!translateCtrl.input) translateCtrl.noInputError = true;
        else translateCtrl.noInputError = false;

        if (translateCtrl.langsSelected == 0) translateCtrl.noLangsError = true;
        else translateCtrl.noLangsError = false;


        if (!translateCtrl.noInputError && !translateCtrl.noLangsERror) {

            angular.forEach(translateCtrl.langsMap, function(lang, key) { 
                if (lang.selected) {
                    var paramsList = {
                        lang: lang.code,
                        text: translateCtrl.input
                    };
                    $http({
                        url: CONSTANTS.TRANSLATE_URL + CONSTANTS.API_KEY,
                        method: "GET",
                        params: paramsList
                    }).success(function(data) {
                        translateCtrl.translations.push({
                            lang: lang.name,
                            text: data.text[0]
                        });
                    });
                }
            });
        }

    };

}]);