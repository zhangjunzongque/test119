
$(function () {
    let page = 1;
    let pageSize = 2;
    let totalPage = 0;
    getData(page,pageSize)
    function getData(page,pageSize) {
        $.ajax({
            // type: 'post',
            data : {
                page:page,
                pageSize: pageSize,
            } ,
            url: '/category/queryTopCategoryPaging',
            success: function(res){
                console.log(res)
                  
                let html = template('category-tpl',res)
                total = res.total
                totalPage = Math.ceil(total/pageSize)
                $('.table').html(html)
            }
        })
    }

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


    $('#save').on('click', function () {
        let categoryName = $.trim($('#category-add').val())
        if(categoryName === ''){
            alert('请填写分类名称')
            return
        }
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: {
                categoryName
            },
            success:function (res) {
                console.log(res);
                location.reload()

            }
        })
    })
})