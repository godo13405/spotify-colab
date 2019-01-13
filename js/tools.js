const tools = {
    setCookie: (cname, cvalue, exdays) => {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
    }
};
export {
    tools
};