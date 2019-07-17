
$(function () {
    let page = 1;
    let pageSize = 3;
    let totalPage = 0;
    // 加载第一页
    getData(page,pageSize)
    // 封装函数
    function getData(page,pageSize) {
        $.ajax({
            // type: 'post',
            data : {
                page:page,
                pageSize: pageSize,
            } ,
            url: '/category/querySecondCategoryPaging',
            success: function(res){
                console.log(res)
                  
                let html = template('category-tpl',res)
                total = res.total
              
                totalPage = Math.ceil(total/pageSize)
                $('.table').html(html)
            }
        })
    }

    // 下一页
    $('#next').on('click', function(){
        page++
        totalPage = Math.ceil(total/pageSize)
        if(page > totalPage) {
            page = totalPage
            alert('这是最后一页')
            return
        }

        getData(page,pageSize)
    })
    // 上一页
    $('#prev').on('click', function(){
        page--
        totalPage = Math.ceil(total/pageSize)
        if(page < 1) {
            page = 1
            alert('这是第一页')
            return
        }

        getData(page,pageSize)
    })

    //2. 二级分类
    $.ajax ({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page:1,
            pageSize: 5,
        },
        success: function(res){
            let html = template('category-first-tpl',res)
            total = res.total
            console.log(12333 + res)
            // totalPage = Math.ceil(total/pageSize)
            $('#category-first-box').html(html)
        }
    })

    // 上传文件
    let branLogo
    $('#fileUpload').fileUpload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            let imsSrc = data.result.picAddr
            $('.img-thumbnail').attr('src',imgSrc)
            branLogo = data.result.picAddr
        }
    });

    // 添加二级分类
    
    $('#save').on('click', function(){
        let branName = $('#branName').val()
        let categoryId = $('#category-first-box').val()

        $.ajax({
            type:"get",
            data:{
                branName,
                categoryId,
                branLogo,
                hot:0
            },
            url:"/category/addSecondCategory",
            dataType:"json",
            success:function(res){
                // console.log(res)
                if(!res.success){
                    alert('接口调用出错')
                    return
                }
                location:reload();
            }
        });
    })
    
})