$(function(){
    let page = 1
    let originHtml = '';
    let priceSort = 0
    let keyWord = getParamsByUrl(location.href, 'keyWord')
    console.log(keyWord);
    let that = null;
function getData() {
    
    if(!that) {
        that = this;
    }
    $.ajax({
        url:"/product/queryProduct",
        type:"get",
        data:{
            proName: keyWord,
            page: page++,
            pageSize: 3,
            price: priceSort
        },
      
        success:function(response){
            console.log(response);
            if(response.data.length === 0) {
                that.endPullupToRefresh(true);
                return
            }
            let html = template('search-tpl',response)
            originHtml += html
            let searchBox =  $('#search-box')
            
            searchBox.html(originHtml)
   
            that.endPullupToRefresh(false);
            
        }   
    });
   }

    mui.init({
        pullRefresh : {
            container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $('#price-sort').on('tap', function(){
     
        // 重置各种变量
        page = 1;
        // pageSize = 0;
        // $('#search-box').html('')
        originHtml = '';
        priceSort = priceSort === 1 ? 2 : 1
        mui('#refreshContainer').pullRefresh().refresh(true);  //重置
        getData()

    })
})

/**
 * 获取地址栏中的参数
 * @param  {string} url 地址字符串
 * @param  {string} name 要获取的参数名称
 * @return {string}     参数名称对应的参数值
 */

function getParamsByUrl(url, name) {
    let querystr = url.split('?').slice(-1)[0]
    let arr = querystr.split('&');
    for (let i = 0; i < arr.length; i++){
        let target = arr[i].split('=')
        if(target[0] === name) {
            return target[1]
        }
    }
    return null
}