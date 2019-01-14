let myTimer = setTimeout(q => {}, 0);
const htmlTools = {
    inject: (content, target) => {
        document.querySelector(target).innerHTML = document.querySelector(target).innerHTML + content;
    },
    autoSearch: q => {
        clearTimeout(myTimer);
        myTimer = setTimeout(q => {
            document.querySelector(".search").submit();
        }, 350);
    },
    searchList: data => {
        let cont = '';
        for (let category in data) {
            cont = `${cont}<li class="${category}-list"><h4>${category}</h4><ol>`;
            for (let item of data[category].items) {
                cont += `<li><a>`;
                cont += `<img src="${item.images && item.images.length ? item.images[item.images.length - 1].url : 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif'}" class="art" />`;
                cont += `<span class="name">${item.name}</span>`;
                cont += `</a></li>`;
            }
            cont += `</ol></li>`;
        }
        return cont;
    }
}

export default htmlTools;