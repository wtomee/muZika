# muZika

To start the project
1. fill inn the data in `backend/.env`

```bash
cp backend/.env.temp backend/.env
```

2. And run

```bash
npm install
npm run start
```

# Documentation

## Backend routes and methods

### GET
- /home & /playlists
- /playlists/:id
- /songs & /discover
- /songs/:id
- /categories
- /categories/:id
- /login
- /forgottenPassword
- /signup


### POST
- /playlists - create new playlist for user
- /songs - upload new song for user
- /login?token="xyz" -authenticate
- /forgottenPassword - button click for pw reset
- /signup - signup with field data

### PUT
- /songs/:id - user can edit song title, img
- /playlists - user can edit playlist name, img


### DELETE
- /songs/:id - user can delete own songs
- /playlists/:id - only playlist is deleted from user

# Frontend

## Pages

**/playlists & /home**

    Landing page where User can see own playlists. Playlists have a picture and name, clickable.
    /home redirects to /playlists

**/playlists/:id**

    Songs listed from the playlist.

**/songs && /discover**

    Songs listed based on most played in a list.

**/songs/:id**

    Music Player page for the song with ID.
    Functions: play/pause, prev, next, favourite(+/-)

**/categories**

    Page for all categories with a picture. Category is clickable.

**/categories/:id**

    Songs listed based on category.


**/login**
    
    Login page
        Fields: username, password
        Buttons: login, forgotten password, signup
    On success redirect to /home

**/login?token="xyz"**
    
    Authenticate if token is valid. Redirect to /login if unsuccessfully authenticated.

**/forgottenPassword**

    Forgotten password page
        Fields: email
        Buttons: send me mail
    Validate mail on buttonClick, show notification ok/error.
    On success show button for /login navigation.

**/signup**

    Signup page
        Fields: username, email, password, confirm password
        Buttons: sign up
    Validate fields: max length, pw confirmation, email format confirmation.
    On success redirect to /login


# Database Schema

## User

**id** (uuid)

**username** (string(32))

**password** (password(64))

**e-mail** (email)

**favourites** (array[music_id])

**playlists** (array[playlist_id])

**own_tracks** (array[music_id])

## Playlist

**id** (uuid)

**name** (string(64))

**image** (string(link))

**songs** (array[music_id])

## Music

**id** (uuid)

**artist** (string(64))

**title** (string(64))

**image** (string(link))

**genre/category** (array[category_id])

## Category

**id** (uuid)

**name** (string(32))

**image** (string(link))