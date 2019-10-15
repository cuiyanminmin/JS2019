let oLis = document.querySelectorAll('.body li');
let box = document.getElementsByClassName('body')[0];
let oImgs = box.getElementsByTagName('img');
let flag = false;
function getData(){
    flag = true;
    var xhr = new XMLHttpRequest();
    xhr.open('get','./data.json',true);
    xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && /200|304/.test(xhr.status)){
        let data = JSON.parse(xhr.response);
        render(data);
        flag = false;
        loadAll();
    }
}
xhr.send();
}
getData();

function render(ary){
    let str = '';
    ary.forEach((item,index)=>{
        let {desc,pic,height,author} = item;
      
        str =`
            <img realSrc="${pic}" src='./img/1.jpg' alt="" style='height:${height}px'>
            <p class="desc">${desc}</p>
            <p class="author">${author}</p>
            `
        let temp = getMinLi();
        let div = document.createElement('div');
        div.className = 'img_box';
        div.innerHTML = str;
        temp.appendChild(div)
    })
}

function getMinLi(){
    let ary = [...oLis].sort((a,b)=>{
        return a.clientHeight - b.clientHeight;
    })
    return ary[0];
}
window.onscroll = function(){

    loadMore();
    loadAll();
   
}
function loadMore(){
    if(!flag) return;
    let li = getMinLi();
    if(utils.offset(li).t+li.clientHeight <= document.documentElement.scrollTop+utils.winH().h){
        if(!flag){
            console.log(666)
            getData();
        }
    }
}

function loadImg(ele){
    if(ele.myLoad)return;
    if(utils.offset(ele).t+ele.clientHeight/2<= document.documentElement.scrollTop + utils.winH().h){
        let realSrc = ele.getAttribute('realSrc');
       let temp = new Image();
       temp.src = realSrc;
        temp.onload = function(){
           ele.src = realSrc;
           ele.myLoad = true;
           fadeIn(ele);
        }
       temp = null;
       
    }
}
function loadAll(){
    [...oImgs].forEach(item=>{
        loadImg(item);
    })
}

