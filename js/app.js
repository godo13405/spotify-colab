'use strict';

import tools from './tools.js';
import htmlTools from './htmlTools.js';
import api from './api.js';
import player from './player.js';

// check if the user's already logged in
api.checkLogin();

const nav = () => {
    let route = tools.getHash();
    console.log('navigating to ', route);
    if (route.access_token) {
        window.location.hash = '';
    } else if (route.q) { // search
        // populate the search box
        document.querySelector(".search input[type='search']").value = decodeURI(route.q);
        document.querySelector(".search").classList.add('active');
        // populate the search suggestions
        const search = api.getData('search', `?q=${route.q}&type=track`)
            .then(data => {
                htmlTools.replaceHtml(htmlTools.searchList(data), ".datalist");
            });
    }
    
    if (!route.q && document.querySelector(".datalist").innerHTML.length) {
        htmlTools.purgeHtml('.datalist');
        document.querySelector(".search").classList.remove('active');
        document.querySelector("input[type='search']").value = '';
    }
};

const playControls = {
    toggle: () => {
        let elem = document.querySelector('.player-control.button.play-pause');
        if (elem.classList.contains('play')) {
            elem.classList.remove('play');
            elem.classList.add('pause');
            player.play(stereo);
        } else if (elem.classList.contains('pause')) {
            elem.classList.add('play');
            elem.classList.remove('pause');
            player.pause(stereo);
        }
    }
}

// router 
window.onhashchange = nav;

// functions acccessible from the HTML
window.autoSearch = htmlTools.autoSearch;
window.addTrack = htmlTools.addTrack;
window.playControls = playControls;

let stereo;

window.onSpotifyWebPlaybackSDKReady = () => {
    stereo = new Spotify.Player({
            name: 'Carly Rae Jepsen Player',
            getOAuthToken: callback => {
                callback(api.checkLogin());
            },
            volume: 0.5
        });
        // spotifyUri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr'
        
    player.connect(stereo);
    player.currentState(stereo);
    player.togglePlay(stereo);
};

nav();