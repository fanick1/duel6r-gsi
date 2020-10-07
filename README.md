# Game State Integration backend for Duel6r

provides endpoint on url `http://127.0.0.1:3000/api/duel6r-gsi`, any JSON data POSTed to this endpoint will be available
for GETing.

# Usage

`npm install`

`npm start`


Start the Duel with following arguments:

```
./duel6r -publish -url http://127.0.0.1/api/duel6r-gsi -port 3000
```

Default values for the `-url` and `-port` are `http://127.0.0.1/api/duel6r-gsi` and `3000`
so in case you don't need to point to different URL you can just run:

```
./duel6r -publish
```

