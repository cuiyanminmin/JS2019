$.extend({
    myFn:function(){
        this.$box = $('#box'),
        this.$ul = this.$box.find('ul'),
        this.$tipBox = this.$box.find('.tip_box'),
        this.$tips = this.$tipBox.children('.tip'),
        this.$leftBtn = this.$box.find('.left_btn'),
        this.$rightBtn = this.$box.find('.right_btn'); 
    }
    
})
$.fn.extend({
    getData:function(){
        $.ajax({
            type:'get',
            url:'./data.json',
            success:function(data){
                //请求成功会执行的函数
                console.log(data)
                this.render(data);
                this.tipClick();//在数据加载完成之后再去绑定事件
            },
            error:function(){
                //请求失败的时候 会执行该函数
                console.log('失败')
            }
        })
    },
    render:function(){
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
    },
    move:function(){
        n++;
        if(n > $tips.length){
            //闪到第一张
            $ul.css('left',0);//$ul.css({left:0})
            n=1;
        }
        $ul.animate({left:-590*n},300);
        autoFocus(n);//显示点的动作
    },
    autoMove:function(){
        timer = setInterval(()=>{
            move();
        },2000)
    }
})