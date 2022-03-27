/**
* @description Print the default foto or foto from API
* @param {link, html} - link on image / the travel card 
* @returns {boolean}
*/
let showImg = (res) => {

    if(!res){
        // image.src = notImg;
        return false;
    }else {
        // image.src = res;
        return true;
    }
}

export { showImg }