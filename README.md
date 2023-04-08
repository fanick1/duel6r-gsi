# Game State Integration backend for Duel6r

Duel6r: https://github.com/odanek/duel6r

Provides endpoint on url `http://127.0.0.1:3000/api/duel6r-gsi`, any JSON data POSTed to this endpoint will be available
for GETing.
Simple minimalistic viewer of the data is implemented in `public/index.html` - navigate to `http://127.0.0.1:3000/` to see it in action.

# Sample data
```
{
    "state": "GAME",
    "round": 9,
    "maxRounds": 10,
    "roundLimit": false,
    "waterRising": false,
    "players": [
        {
            "name": "Player0",
            "team": 2,
            "ping": 114,
            "reloadTime": 1.6,
            "reloadInterval": 0.34,
            "alive": true,
            "timeSinceHit": 81.4201,
            "health": 92,
            "air": 179,
            "points": 6,
            "kills": 9,
            "roundKills": 7,
            "deaths": 8,
            "bonus": "invisibility",
            "bonusRemainingTime": 9.45583,
            "ammo": 11,
            "weapon": "machine gun"
        },
        {
            "name": "Player1",
            "team": 4,
            "ping": 106,
            "reloadTime": 1.6,
            "reloadInterval": 0.29,
            "alive": true,
            "timeSinceHit": 81.4201,
            "health": 98,
            "air": 198,
            "points": 4,
            "kills": 5,
            "roundKills": 4,
            "deaths": 3,
            "bonus": "invisibility",
            "bonusRemainingTime": 9.45583,
            "ammo": 10,
            "weapon": "machine gun"
        }
    ]
}
```


# Websocket

The backend exposes websocket at `ws://127.0.0.1:3000/api/duel6r-gsi-ws` for reads

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

# CURL test

```
curl -X POST http://localhost:3000/api/duel6r-gsi/ -d '{"state":"GAME"}' -H "Content-Type: application/json" -v
```
