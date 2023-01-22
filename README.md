# MJ-api-node-js

# .env

```
DISCORD_OAUTH_TOKEN=
STRIPE_ENDPOINT_SECRET=
```

# Run with new account
```
1)

Set user DISCORD_OAUTH_TOKEN token


2)
Get POST data and set into

helpers/generateImageInChanel.js

in const data

3) Update nonce from POST data in

DB_storage/nonce.json

```

# socket io

```
This app emit events to user socket in "should-update-images" event

should-update-user-images in global event

more details in

helpers/imgUpdaterByImgDescription.js
```
