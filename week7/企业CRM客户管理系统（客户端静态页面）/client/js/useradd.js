$(function(){
    // 将当前操作的导航存到sessionStorage中
    sessionStorage.setItem('currentUrl','./page/useradd.html')
    let $username = $('.username'),
        $man = $('#man'),
        $woman = $('#woman'),
        $useremail = $('.useremail'),
        $userphone = $('.userphone'),
        $userdepartment = $('.userdepartment'),
        $userjob = $('.userjob'),
        $userdesc = $('.userdesc'),
        $submit = $('.submit');
    let id = location.href.queryURLParams().id;
    //id是当前编辑的那个用户的id
    let depId = null,
        jId = null;
    let departmentId
    if (id!=undefined){
        //是编辑状态
        axios.get('/user/info?userId='+id).then(data=>{
            if(data.code == 0){
                let {name,sex,email,phone,departmentId,jobId,desc} = data.data;
                $username.val(name);
                sex==0 ?$man.attr('checked',true):$woman.attr('checked',true);
                $useremail.val(email);
                $userphone.val(phone);
                $userdesc.val(desc);
                // depId = departmentId;
                // jId = jobId;
                //$userdepartment
                //$userjon
                initSelect('/department/list',$userdepartment,departmentId);
                initSelect('/job/list',$userjob,jobId);
            }else{
                alert('系统繁忙')
            }
        })
    }
    else{
        //新增
        initSelect('/department/list',$userdepartment,1);
        initSelect('/job/list',$userjob,1);
    }
    /* function initDepart(){
        //初始化 部门列表
        axios.get('/department/list').then(data=>{
            let ary = data.data || [];
            let str = '';
            ary.forEach(item=>{
                str +=`<option value="${item.id}">${item.name}</option>`
            })
            $userdepartment.html(str);//把拼接好的结构放到盒子中
            $userdepartment.val(depId);//是让对应的部门选中
        })
    }
    initDepart();
    function initJob(){
        //初始化 职务列表
       
    } */
    function initSelect(url,$ele,id){
        axios.get(url).then(data=>{
            let ary = data.data || [];
            let str = '';
            ary.forEach(item=>{
                str +=`<option value="${item.id}">${item.name}</option>`
            })
            $ele.html(str);//把拼接好的结构放到盒子中
            $ele.val(id);//是让对应的部门选中
        }) 
    }
    //实现提交
    $submit.on('click',function(){
        //执行post执行之前先判断必填输入框是否为空
        //姓名 性别 邮箱 手机 部门 职务
        let name = $username.val(),
        sex = $man[0].checked?0:1,//$man[0] JQ对象转原生对象 男的被选中就是男的 没有就是女的
        email = $useremail.val(),
        phone = $userphone.val(),
        departmentId = $userdepartment.val(),
        jobId = $userjob.val(),
        desc = $userdesc.val();
        if(name&&email&&phone&&departmentId&&jobId){
            let obj = {}
            id ? obj.userId = id : null;
            let option = {
                userId:id,
                name,
                sex,//$man[0] JQ对象转原生对象 男的被选中就是男的 没有就是女的
                email,
                phone,
                departmentId,
                jobId,
                desc
            }
            //新增接口是add;更新接口是 update
            let url = id?'user/update':'user/add';
            axios.post(url,Object.assign(option,obj)).then(data=>{
            })//Object.assign()合并对象 返回值是合并之后的前边儿的对象  lodash;   let o = assign(a,b);//把对象b合并到a中 返回值是合并之后的a     o ===a
        }else{
            alert('必填项不能为空')
        }

        axios.post('/user/update',{
            userId:id,
            name,
            sex,//$man[0] JQ对象转原生对象 男的被选中就是男的 没有就是女的
            email,
            phone,
            departmentId,
            jobId,
            desc
        })
    })
})
