var xhr = new XMLHttpRequest();
xhr.open('get','./data.json',true);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        data = JSON.parse(xhr.response)
        render(data);
        myBind(data);
    }
}
xhr.send();
var box = document.getElementById('mc'),
    timeBtn = document.getElementById('timeBtn'),
    priceBtn = document.getElementById('priceBtn'),
    commBtn = document.getElementById('commBtn');

function render(ary){
    var str = '';
    ary.forEach(item=>{
        let {img,time,num,price,title} = item;
        str += `  <li>
        <div class="imgBox">
            <img src="${img}"
                alt="">
        </div>
        <div class="titl">${title}</div>
        <div class="desc">手机描述</div>
        <div class="price">￥${price}</div>
        <div class="botBox">
            <div class="chose">选购</div>
            <div class="num">评价数${num}</div>
        </div>
    </li>`
    })
    box.innerHTML = str;
}
function myBind(data){
    function click(ele,key){
        ele.flag = 1;
        ele.onclick = function(){
            this.flag *=-1;
            data.sort((a,b)=>{
                return (a[key]-b[key])*this.flag
            })
            render(data)
        }
    }
    click(timeBtn,'time')
    click(priceBtn,'price')
    click(commBtn,'num')
}