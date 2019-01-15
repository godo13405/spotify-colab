import tools from './tools.js';

let myTimer = setTimeout(() => {}, 0);
const htmlTools = {
    inject: (content, q) => {
        document.querySelector(q).innerHTML = document.querySelector(q).innerHTML + content;
    },
    purgeHtml: q => {
        document.querySelector(q).innerHTML = '';
    },
    replaceHtml: (content, q) => {
        htmlTools.purgeHtml(q);
        htmlTools.inject(content, q);
    },
    autoSearch: () => {
        clearTimeout(myTimer);
        myTimer = setTimeout(() => {
            let q = encodeURI(document.querySelector('.search input').value.trim());
            window.location.hash = `q=${q}`;
        }, 350);
    },
    searchList: data => {
        let cont = '';
        for (let category in data) {
            if (data.length > 1) {
                cont = `${cont}<li class="${category}-list"><h4>${category}</h4><ol>`;
            }
            cont += htmlTools.searchListItem(data[category]);
            cont += `</ol></li>`;
        }
        return cont;
    },
    searchListItem: data => {
        let out = '';
        for (let item of data.items) {
            console.log(item);
            out += `<li><a href="javascript:addTrack(${item})">`;
            out += `<img src="${tools.getArt(item)}" class="art" />`;
            out += `<span class="name">${item.name}</span>`;
            out += `</a></li>`;
        }
        return out;
    },
    addTrack: (track) => {
        console.log(track);
    }
}

export default htmlTools;