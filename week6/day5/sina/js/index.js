let slideBox = document.querySelector('#SlideBox');
function swiperInit(){
    var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        loop:true
      });
}
  function getData(url,cb){
      var xhr = new XMLHttpRequest();
    //   xhr.open('get','./data/banner.json',true);
      xhr.open('get',url,true);
      xhr.onreadystatechange = function(){
        if(xhr.readyState ==4&&/200|304/.test(xhr.status)){
            let data = JSON.parse(xhr.response);
            // console.log(data);
            // render(data);
            // swiperInit();
            cb && cb(data);//cb存在并且执行
        }
      }
      xhr.send();
  }
  //获取banner数据的
    getData('./data/banner.json',function(data){
            render(data);
            swiperInit();
    });
  function render(ary){
      let str='';
     ary.forEach(item=>{
         let {img,title} = item;
        str+=` <div class="swiper-slide">
                    <img src="${img}" alt="">
                    <p>${title}</p>
                </div>`
        slideBox.innerHTML = str;
     })
  }
  //获取列表数据的
  getData('./data/list.json',function(data){
      console.log(data);
      renderList(data);
  })
  function renderList(data){
    let str='';
    data.forEach(item=>{
        if(item.type ==0){
            //无图情况
            str +=` <div class="list">
            <div class="textBox">
                <p>很好很好哦很好很好哦</p>
                <div class="commentBox">
                    <span class="icon_com">${item.commentNum}</span>
                    <span>环球时报</span>
                </div>
            </div>
    </div>`
        }
        else{
            //单图情况
            str+=`<div class="list">
            <div class="textBox">
                <p>很好很好哦很好很好哦</p>
                <div class="commentBox">
                    <span class="icon_com">${item.commentNum}</span>
                    <span>环球时报</span>
                </div>
            </div>
            <div class="imgBox">
                <img src="${item.img[0]}" alt="">
            </div>
        </div>`
        }
        document.querySelector('.listBox').innerHTML = str;
    })
  }