var utils = {
    getCss(ele,attr){
        //该方法 可以让我们获取ele的attr属性
        var str = getComputedStyle(ele)[attr];
        if(/width|height|padding|margin|left|right|top|bottom/.test(attr)){
            return parseFloat(str)
        }
        return str;
    },
    setCss(ele,attr,val){
        if(/width|height|padding|margin|left|right|top|bottom/.test(attr)){
            ele.style[attr] = parseFloat(val)+'px';
        }
        else{
            ele.style[attr] = val;
        } 
    },
    winH(){
        //获取当前屏幕的高度
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        //获取当前屏幕的宽度
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        return{
            w,h
        }
    },
    offset(ele){
        //求出ele到body的偏移量
        let l = ele.offsetLeft,
            t= ele.offsetTop;
       let temp = ele.offsetParent;
       while(temp){//因为body的上级参照物是null所以可以这样写
           l += temp.offsetLeft + temp.clientLeft;
           t += temp.offsetTop + temp.clientTop;
           temp =temp.offsetParent;
       }
       return {
           l,t
       }
    }
}