let ul = document.querySelector('#box .img_box ul');
let box = document.querySelector('#box');
let tipBox = document.querySelector('#box .tip_box');
let tips = document.getElementById('box').getElementsByClassName('tip');

let leftBtn = document.querySelector('#box .left_btn'),
    rightBtn = document.querySelector('#box .right_btn');


//获取数据
function getData(){
    let xhr = new XMLHttpRequest();
    xhr.open('get','./data.json',true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && /200|304/.test(xhr.status)){
            let data = JSON.parse(xhr.response);
            console.log(data);
            render(data);
            move();//数据渲染 完成之后再去开启动画；
            tipClick();
        }
    }
    xhr.send();
}
getData();

//渲染数据
function render(data){
    data = data || [];
    let str = '';
    let tipStr ='';
    data.push(data[0]);//在数组的末尾添加了 第一项； 是为了在最后补一张一样的图；
    data.forEach((item,index)=>{
        let {img,desc} = item;
        str += `<li>
        <img src="${img}" alt="">
        <p class="desc">${desc}</p>
         </li>`;
         if(index !== data.length-1){
             //渲染 小点
            if(index==0){
                //只有第一项 才默认有 current类名
               tipStr += `<span class="tip current"></span>\n`;
            }else{
                tipStr +=`<span class="tip"></span>\n`;
            }
         }  
    })
    tipBox.innerHTML = tipStr;
    ul.innerHTML = str;
    ul.style.width = data.length *590+'px';//更新盒子的宽度
}

let n = 0;
let timer = null;
function move(){
    timer = setInterval(()=>{
      change();
    },2000);
}

function change(){
    n++;//n=4的时候显示的是伪第一张；
    if(n==(tips.length+1)){
        ul.style.transition = 'left 0s ease-in';
        ul.style.left = 0;//让图片直接闪到第一张;紧接着要向第二张图移动；
        n=1;
    }
    tipClass(n)
    // animate(ul,{left:-590*n},500,function(){console.log(666)})
    setTimeout(()=>{
        //同步情况下，代码从上到下执行的时候，只会让下边的代码起作用；上边代码回覆盖
        //异步情况下，异步代码会被忽略掉，同步先执行，完事之后异步再执行；
        ul.style.transition = 'left 0.5s ease-in'
        ul.style.left = -590*n+'px';
    },10)
    
    
}

//划入盒子时 清除动画；

box.onmouseenter = function(){
    clearInterval(timer)
}
//划出盒子时 重启动画
box.onmouseleave = function(){
    move()
}

//处理 tip 类名的函数
function tipClass(m){
    m = m>=tips.length ? 0:m;//当n 指向了伪第一张的时候我们要让第一个点高亮
    for(let i=0;i<tips.length;i++){
        tips[i].className = 'tip';
    }
    tips[m].className ='tip current';
}

//点击左右按钮执行的操作
/* rightBtn.onclick =function(){
    change();
} */
rightBtn.onclick = debounce(function(){
    change();
})

leftBtn.onclick = function(){
    n--;
    //n==-1的 我们要做什么操作？我们要瞬间闪到最后一张
    if(n<0){
        ul.style.transition = 'none';
        ul.style.left = -590*(tips.length)+'px'; 
        n = tips.length-1;
    }
    tipClass(n);
    // animate(ul,{left:-590*n},500)
    setTimeout(()=>{
        ul.style.transition = 'left 0.5s ease-in';
        ul.style.left =-590*n+'px';
    },10)
}

function tipClick(){
    for(let i=0;i<tips.length;i++){
        tips[i].onclick = function(){
            n = i;
            tipClass(n);
            // animate(ul,{left:-590*n},500)
            ul.style.transition = 'left 0.5s ease-in';
            ul.style.left = -590*n+'px';
        }
    }
}

//防抖
function debounce(fn,wait =500){
    var timer = null;
    return function(){
        if(timer ==null){
            fn.apply(this,arguments)
            timer =0;
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,arguments)
        },wait);
    }
}



