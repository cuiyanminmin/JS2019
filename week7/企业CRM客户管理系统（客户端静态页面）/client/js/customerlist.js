$(function(){

    let page = 1,limit = 5;
    console.log(location.hash);
    window.addEventListener('hashchange',function(){
        console.log(location.hash);
          // 将当前操作的导航存到sessionStorage中
    sessionStorage.setItem('customerUrl','./page/customerlist.html'+location.hash)
    })
    function getData(options={}){
        //options 存储的是发送给后台的数据
        options.lx = location.hash.slice(1);
        axios.get('/customer/list',{
            params:options
        }).then(data=>{
            render(data.data)
            initPage(data.limit,data.total,data.page)//data.page 为了知道让谁亮
        })
    }
    function render(ary){
        let str = '';
        ary.forEach(item=>{
            let {id,name,sex,email,phone,QQ,weixin,type,address,userName=""} = item
            str +=`<tr>
                    <td class="w8">${name}</td>
                    <td class="w5">${sex==0?'男':'女'}</td>
                    <td class="w10">${email}</td>
                    <td class="w10">${phone}</td>
                    <td class="w10">${weixin}</td>
                    <td class="w10">${QQ}</td>
                    <td class="w5">${type}</td>
                    <td class="w8">${userName}</td>
                    <td class="w20">${address}{</td>
                    <td class="w14">
                        <a href="./customeradd.html?id="${id}">编辑</a>
                        <a href="javascript:;">删除</a>
                        <a href="。/visit.html">回访记录</a>
                    </td>
                </tr>`
                // <a href="javascript:;">删除</a> 阻止默认事件
        })
        $('tbody').html(str);
    }
    getData({
        limit,
        page  //对应的页数是亮着的
    });
    function initPage(limit,total,current){
        let n = Math.ceil(total/limit);//有几页
        let str ='';
        for(let i=0;i<n;i++){
            str +=`<li class=${i+1 == current?'active':''}>${i+1}</li>`
        }
        $('.pageNum').html(str);
        $('.pageBox').off();//移除所有的事件  为了省性能
        $('.pageBox').on('click',function(e){//二级事件
            let tar = e.target;
            let type = tar.tagName.toLowerCase();//为了知道自己点击的是哪个元素
            if(type =='li'){
                //点击的是页码
                page = tar.innerHTML;
                getData({
                    limit,
                    page
                })
            }else if(type =='a'){
                //点击的是上下页
                if($(tar).index()==0){
                    //说明点击的是上一页
                    page = page == 1?1:page-1; //需要有个边
                   
                }
                else{
                    page = page == n?n:page+1
                    getData()
                }
                getData({
                    limit,page
                })
            }
        })
    }

})