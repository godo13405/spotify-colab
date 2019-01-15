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

const nav = () => {
    let route = tools.getHash();
    console.log('navigating to ', route);
    if (route.q) { // search
        // populate the search box
        document.querySelector(".search input[type='search']").value = decodeURI(route.q);
        document.querySelector(".search").classList.add('active');
        // populate the search suggestions
        const search = api.getData('search', `?q=${route.q}&type=track`)
            .then(data => {
                htmlTools.replaceHtml(htmlTools.searchList(data), ".datalist");
            });
    } else {
        htmlTools.purgeHtml('.datalist');
        document.querySelector(".search").classList.remove('active');
        document.querySelector("input[type='search']").value = '';
    }
};

// router 
window.onhashchange = nav;

// functions acccessible from the HTML
window.autoSearch = htmlTools.autoSearch;
window.addTrack = htmlTools.addTrack;

nav();