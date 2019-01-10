'use strict';

const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
/*
const spotifyApi = new SpotifyWebApi({
    clientId: 'fee59ad5637848b7821ef076ba4cc8d0',
    clientSecret: '7cd62ed472fe4e43bf217b59af543ae4',
    redirectUri: 'http://www.example.com/callback'
});
*/

const scopes = ['user-read-private', 'user-read-email'],
    redirectUri = 'https://example.com/callback',
    clientId = 'fee59ad5637848b7821ef076ba4cc8d0',
    state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId
});

// Create the authorization URL
const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
console.log(authorizeURL);

// Get Elvis' albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function (data) {
        console.log('Artist albums', data.body);
    },
    function (err) {
        console.error(err);
    }
);