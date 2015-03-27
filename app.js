(function() {
	var app = angular.module('translate', [ ]);
    
    var translateUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate?'
    var langsUrl = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?'
    
    var API_KEY = 'key=trnsl.1.1.20150223T123008Z.b011910a62c9313a.b80623ee865a31ba17519a2073b6708b1d1226b3'
    
    app.directive('translationBlock', function() {
        return {
            restrict: 'E',
            templateUrl: 'translation-block.html'
        };
    });
    
    app.factory('getLangCodes', [ '$http', function($http) {
        
        return function(uilang) {
            return $http({
                url: langsUrl + API_KEY,
                method: "GET",
                params: {ui: uilang}
            });
        };
        
    }]);
                
	app.controller('TranslateController', [ '$http', 'getLangCodes', function($http, getLangCodes) {
        
        var translateCtrl = this;
        
        var langsMap = []
        translateCtrl.languagesLoaded = false;
        getLangCodes("en").success(function(data) {
            langsMap = data.langs;
            translateCtrl.languagesLoaded = true;
        }).error(function(error) {
            translateCtrl.error = true;
        });
        
        var langs = [
            'pt',
            'fr',
            'ru',
            'de'
        ]
        
        this.refresh = function() {
            var id = window.setTimeout(function() { translateCtrl.submit() },800);
            while (id--) {
                window.clearTimeout(id);
            }  
        }

        this.submit = function() {
            translateCtrl.translations = [];
            for (i = 0; i < langs.length; i++) {
                var paramsList = {
                    lang: langs[i],
                    text: translateCtrl.input
                };
                $http({
                    url: translateUrl + API_KEY,
                    method: "GET",
                    params: paramsList
                }).success(function(data) {
                    translateCtrl.translations.push({
                        text: data.text[0], 
                        lang: langsMap[data.lang.slice(-2)]
                    });
                });
            }
        };
      
	}]);

})();