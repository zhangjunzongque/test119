

$(function (){

    $.ajax({
        type:"get",
        data:{
            page:1,
            pageSize: 10,
        },
        url:"/product/queryProductDetailList",
        dataType:"json",
        success:function(res){
            console.log(res);
            let html = template('productTpl',res)
            // $('.table').html(html)  /// table 的id id="productBox"
            $('#productBox').html(html)

        }
    });

    $.ajax({
        type:"get",
        data:{
            page:1,
            pageSize: 10,
        },
        url:"//category/querySecondCategoryPaging",
        dataType:"json",
        success:function(res){
            console.log(res);
            let html = template('brandTpl',res)
            // $('.table').html(html)  /// table 的id id="productBox"
            $('#brandBox').html(html)

        }
    });

    let imgArr = []
    $('#fileUpload').fileUpload ({
        dataType: 'json',
        done: function(e,data){
            console.log(data);
            imgArr.push(data.result.picArr)
            //$('.img-thumbanail).attr('src',brandLogo)
        }
    });

    $('#addProduct').on('click', function(){
        let proName = $('[name="proName"]').val().trim();
        let oldPrice = $('[name="oldPrice"]').val().trim();
        let proDesc = $('[name="proDesc"]').val().trim();
        let num = $('[name="num"]').val().trim();
        let size = $('[name="size"]').val().trim();
        // let oldPrice = $('[name="oldPrice"]').val().trim();
        let price = $('[name="price"]').val().trim();
        let brandId = $('[name="brandId"]').val().trim();

        $.ajax({
            url:"/product/addProduct",
            type:"post",
            data:{
                proName:proName,
                oldPrice:oldPrice,
                proDesc:proDesc,
                num:num,
                size:size,
                price:price,
                brandId:brandId,
                statu: 1,
				pic: imageArray
            },
            
            dataType:"json",
            success:function(res){
                console.log(res)
                if(!res.success){
                    alert(res.message + '出错了');

                }
                location.reload();
            }
        });
    })
})