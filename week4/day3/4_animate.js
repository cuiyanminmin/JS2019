function animate(ele,option,duration,type,cb){
    var moveType = {
        linear:function linear(time,changeL,duration,beginL) {
            return changeL/duration*time + beginL;
        },
        easeIn: function (t,c,d,b) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t,c,d,b) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t,c,d,b) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    };
    function move2(ele,duration,option,type='linear'){
        let startObj = {}//存放的是各个属性的初始值；
        for(var k in option){
            startObj[k] = parseFloat(getComputedStyle(ele)[k]);
        }
        let time = 0;//记录的是运动过的时间
        let l={};//记录的元素当前的位置
        let timer = setInterval(()=>{
            time +=10;
            //l = linear(start,target,duration,time);
            for(let k in startObj){
                //l[k] = linear(startObj[k],option[k],duration,time)
                l[k] = moveType[type](time,option[k]-startObj[k],duration,startObj[k])
            }
            if(time>=duration){
                l = option;//让当前位置 等于目标位置即可
                clearInterval(timer)
            }
           // ele.style[attr] = l+(attr ==='opacity'?'':'px');
           for(let k in option){
            ele.style[k] = l[k]+(k ==='opacity'?'':'px');
           }
        },10);
    }
    if(typeof dduration =='function' ||typeof type =='function'){
        cb = duration;
        duration = 1000;
    }
}
animate(box,{left:500,top:500},1000,'easeIn',function(){
    console.log('动画完成之后执行')
})