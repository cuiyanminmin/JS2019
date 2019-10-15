//jqure获取的元素不存在映射；
let $box = $('#box'),
    // ul = $('#box .img_box ul')
    // $ul = $box.children('.img_box ul').children('ul');
    $ul = $box.find('ul'),
    $tipBox = $box.find('.tip_box'),
    $tips = $tipBox.children('.tip'),
    $leftBtn = $box.find('.left_btn'),
    $rightBtn = $box.find('.right_btn');

let n = 0,timer = null;//n是控制显示张数的索引
function getData(){
    $.ajax({
        type:'get',
        url:'./data.json',
        success:function(data){
            //请求成功会执行的函数
            console.log(data)
            render(data);
            tipClick();//在数据加载完成之后再去绑定事件
        },
        error:function(){
            //请求失败的时候 会执行该函数
            console.log('失败')
        }
    })
}
getData();
function render(data){
    // data = data || [];容错
    let str = '';
    let tipStr = '';
    data.push(data[0]);//补图
    data.forEach((item,index)=>{
        str +=` <li>
            <img src="${item.img}" alt="">
            <p class="desc">${item.desc}</p>
        </li>`;
        //点的补图的操作
        if(index ==0){
            tipStr +=` <span class="tip current"></span>`
        }
        else if(index < data.length-1){
            tipStr +=`<span class="tip"></span>`
        }
    });
    // $ul[0].innerHTML = str;
    $ul.html(str); 
    $tipBox.html(tipStr);
    $ul.width(590*data.length);
    $tips = $tipBox.children('.tip');//更新 $tips 因为他不存在DOM映射
}
function move(){
    n++;
    if(n > $tips.length){
        //闪到第一张
        $ul.css('left',0);//$ul.css({left:0})
        n=1;
    }
    $ul.animate({left:-590*n},300);
    autoFocus(n);//显示点的动作
}
function autoMove(){
    //自动轮播
    timer = setInterval(()=>{
        move();
    },2000)
}
autoMove();

function autoFocus(m){
    if(m >= $tips.length){
        m = 0;//m == $tips.length 显示的是伪第一张
    }
    //m就是要有点的哪个索引
    //$tips.eq(m) jq对象拿到索引为m的索引   
    //siblings()是$tips的兄弟元素
    $tips.eq(m).addClass('current').siblings().removeClass('current')
}
$box.on('mouseenter',function(){
    clearInterval(timer)
})
$box.on('mouseleave',function(){
    autoMove();
})
$leftBtn.on('click',function(){
    n--;
    if(n<0){
        $ul.css({left:-$tips.length*590});//闪到最后一张
        n = $tips.length-1;
    }
    $ul.animate({left:-n*590},200);
    autoFocus(n);
})
$rightBtn.on('click',function(){
    move();
})

function tipClick(){
    $tips.on('click',function(){
        // console.log($(this).index())
        let m = $(this).index();
        //这里的this是原生对象
        n = m;
        $ul.animate({left:-590*m},200);
        autoFocus(m);

    })
}

//再JQ的原型上设置的
$.fn.extend({
    //把对应的方法放到了JQ原型上
    myFn:function(){
        console.log(666);
        console.log(this);//这里 的this是看是谁执行这个函数，执行的是JQ对象时,this就是JQ对象
    },
    banner:function(){

    }
})
$box.myFn();
$.extend({
    //把对应的方法放到了JQ自身上（JQ 当作了普通对象）
    myFn:function(){
        console.log(999)
    }
})
$.myFn();


//获取数据


//扩展知识点：报错的放在里边儿，没有问题的还是会继续输出，报错的会以字符串的形式报错
//try 里边放输出的内容 catch输出一下catch的形参，是为了让报错以字符串的形式输出在控制台；
/* try{
    console.log(555)
    console.log(qqq);
}catch(e){
    console.log(e)
}

console.log(666); */