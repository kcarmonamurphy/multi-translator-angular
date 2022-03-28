# Multi-Translator

`multi-translator-angular` is a simple Angular.js (v1) app which can translate an English word or phrase into multiple languages, simultaneously. It relies on the LibreTranslate translation engine to provide these translations.

N.B: Formerly, this project used the Yandex Translation API which resulted in better translations, however, due to the ongoing Ukrainian-Russian conflict I have opted to withdraw usage of the Yandex API.

### Getting started

To run locally, you'll need to spin up an http server in the project directory. Python v3 can do this fairly simply:

```
cd ~/path/to/project/directory
python -m http.server 8000
```

Next, simply navigate to `http://localhost:8000/`.

The app relies on the `libretranslate.de` mirror which enforces rate limiting and may stop working if too many translations are requested.

To overcome this, you can run the API server locally:

```
docker run -ti -p 6001:5000 libretranslate/libretranslate --load-only=en,fr,es,it,ru
```
