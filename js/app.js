'use strict';

import {
    tools
} from './tools.js';
import {
    htmlTools
} from './htmlTools.js';
import {
    api
} from './api.js';

// check if the user's already logged in
const accessToken = tools.checkCookie('accessToken');
if (!accessToken) {
    api.login();
} else {
    let user = api.getData('me/player');
}

// router 
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('q')) { // search
    // populate the search box
    document.querySelector("input[type='search']").value = urlParams.get('q');

    // populate the search suggestions
    const search = api.getData('search', window.location.search + '&type=track,artist,album&limit=10')
        .then(data => {
            console.log(data);
            let cont = '';
            for (let category in data) {
                cont = `${cont}<li><h4>${category}</h4><ol>`;
                for (let item of data[category].items) {
                    cont = `${cont}<li><a>${item.name}</a></li>`
                }
                cont = `${cont}</ol></li>`;
            }
            htmlTools.inject(cont, ".datalist");
        });
}

// functions acccessible from the HTML
const autoSearch = htmlTools.autoSearch;