var directives = angular.module("directives", []);

directives.directive('translationBlock', function() {
    return {
        restrict: 'E',
        templateUrl: 'html-partials/translation-block.html'
    };
});

directives.directive('errorMessages', function() {
    return {
        restrict: 'E',
        templateUrl: 'html-partials/error-messages.html'
    };
});

directives.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.toggleClass(attrs.toggleClass);
            });
        }
    };
});

directives.directive('stopEvent', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element.bind(attr.stopEvent, function(e) {
                e.stopPropagation();
            });
        }
    };
});   