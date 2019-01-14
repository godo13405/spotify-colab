'use strict';

import tools from './tools.js';
import htmlTools from './htmlTools.js';
import api from './api.js';

// check if the user's already logged in
const accessToken = tools.checkCookie('accessToken');
if (!accessToken) {
    api.login();
} else {
    let user = api.getData('me/player');
}

// router 
const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('q')) { // search
    // populate the search box
    document.querySelector("input[type='search']").value = urlParams.get('q');
    document.querySelector(".search").classList.add('active');

    // populate the search suggestions
    const search = api.getData('search', window.location.search + '&type=track,artist,album&limit=10')
        .then(data => {
            htmlTools.inject(htmlTools.searchList(data), ".datalist");
        });
} else {
    document.querySelector(".search").classList.remove('active');
    document.querySelector("input[type='search']").value = '';
}

// functions acccessible from the HTML
window.autoSearch = htmlTools.autoSearch;