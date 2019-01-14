const htmlTools = {
    inject: (content, target) => {
        document.querySelector(target).innerHTML = document.querySelector(target).innerHTML + content;
    },
    autoSearch: q => {
        clearTimeout(myTimer);
        myTimer = setTimeout(q => {
            document.querySelector(".search").submit();
        }, 350);
    }
}

export {htmlTools};