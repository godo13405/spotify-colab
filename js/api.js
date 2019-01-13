import {
    tools
} from "./tools.js";

const api = {
    getLoginURL: scopes => {
        const CLIENT_ID = 'fee59ad5637848b7821ef076ba4cc8d0',
            REDIRECT_URI = 'http://localhost:3000';
        return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
            '&scope=' + encodeURIComponent(scopes.join(' ')) +
            '&response_type=token';
    },
    logon: callback => {
        let url = api.getLoginURL([
            'user-read-email',
            'user-read-playback-state'
        ]);
        window.location.replace(url);
    },
    getData: (endpoint, params) => {
        return fetch(`https://api.spotify.com/v1/${endpoint ? endpoint: 'me/'}${params ? params : ''}`, {
            headers: {
                'Authorization': 'Bearer ' + tools.getCookie('accessToken')
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            return data;
        });
    }
};

export {
    api
};