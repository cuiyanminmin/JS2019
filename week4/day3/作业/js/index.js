let ul = document.getElementsByClassName('body_box')[0];
let top1 = document.getElementsByClassName('top')[0];
ul.onclick = function(e){
    e = e || window.event;
    let tar = e.target || e.srcElement;
    //首先 判断 点击的元素是不是 span
    if(tar.nodeName.toLowerCase()=='span'){
        console.log(tar.parentNode.getAttribute('type'));
        let type = tar.parentNode.getAttribute('type');
        let p = document.getElementsByClassName(type)[0];
        p.innerHTML =` <span class="desc">${tar.innerHTML}</span>
        <span class="cancel">X</span>`
        p.style.display ='block';
    }
}
top1.onclick = function(e){
    e = e||window.event;
    let tar = e.target || e.srcElement;
    if(tar.className ='cancel'){
        tar.parentNode.style.display = 'none';
    }
}