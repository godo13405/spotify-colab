const tools = {
    setCookie: (cname, cvalue, time) => {
        let d = new Date();
        d.setTime(d.getTime() + (time*1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    deleteCookie: (cname) => {
        document.cookie = cname + "=;Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    },
    getCookie: cname => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    checkCookie: cookie => {
        let c = tools.getCookie(cookie);
        if (c) {
            return c;
        } else {
            return false;
        }
    },
    getHash: () => {
        let hashArr = window.location.hash.substr(1).split('&'),
            hash = {};
        for (const x of hashArr) {
            let temp = x.split('=');
            hash[temp[0]] = temp[1];
        }
        return hash;
    },
    getArt: item => {
        let art = 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif';
        if (item.images && item.images.length) {
            art = item.images[item.images.length - 1].url;
        } else if (item.album && item.album.images && item.album.images.length) {
            art = item.album.images[item.album.images.length - 1].url;
        }
        return art;
    }
};
export default tools;