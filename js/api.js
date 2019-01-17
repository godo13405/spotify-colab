import tools from "./tools.js";

const api = {
    checkLogin: () => {
        const accessToken = tools.checkCookie('accessToken');
        if (!accessToken || accessToken == 'undefined') {
            api.login();
            return false;
        } else {
            return accessToken;
        }
    },
    getLoginURL: (scopes = [
                'user-read-email',
                'user-read-private',
                'streaming',
                'user-read-birthdate'
            ]
        ) => {
        const CLIENT_ID = 'fee59ad5637848b7821ef076ba4cc8d0',
            REDIRECT_URI = 'http://localhost:3000';
        return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
            '&scope=' + encodeURIComponent(scopes.join(' ')) +
            '&response_type=token';
    },
    login: () => {
        let url = api.getLoginURL();
        window.location.replace(url);
        let hash = tools.getHash();
        tools.setCookie('accessToken', hash.access_token, hash.expires_in);
    },
    getData: (endpoint, params) => {
        return fetch(`https://api.spotify.com/v1/${endpoint ? endpoint: 'me/'}${params ? params : ''}`, {
            headers: {
                'Authorization': 'Bearer ' + tools.getCookie('accessToken')
            }
        }).then(response => {
            if (response.status === 401) {
                tools.deleteCookie('accessToken');
                api.getLoginURL();
            }
            return response.json();
        }).then(data => {
            return data;
        });
    }
};

export default api;