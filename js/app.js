'use strict';

import { tools } from './tools.js';
import { api } from './api.js';

// check if the user's already logged in
const accessToken = tools.checkCookie('accessToken');
if (!accessToken) {
    api.login();
    let hash = tools.getHash();
    tools.setCookie('accessToken', hash.access_token, hash.expires_in);
} else {
    let user = api.getData('me/player');
    console.log(user);
}

// router 
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.get('q')) { // search
    const search = api.getData('search', window.location.search+'&type=artist');
    console.log(search);
}