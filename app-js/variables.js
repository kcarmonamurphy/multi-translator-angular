var variables = angular.module("variables", []);

variables.constant("CONSTANTS", {
    "TRANSLATE_URL": "https://libretranslate.de/translate",
    "LANGS_URL": "https://libretranslate.de/languages",
    "MAX_LANGS": 5
});

// Uncomment to use with local server
// variables.constant("CONSTANTS", {
//     "TRANSLATE_URL": "http://localhost:6001/translate",
//     "LANGS_URL": "http://localhost:6001/languages",
//     "MAX_LANGS": 5
// });