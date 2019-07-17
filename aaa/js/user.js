

$(function (){
    $.ajax({

        url: '/user/queryUser',
        data: {
            page: 1,
            pageSize: 10,
        },
        success: function(res){
            console.log(res)
            let html = template('user-tpl',res)
            console.log(html);
            $('.table').html(html)
        }
    })




    $('.table').on('click', '.edit-btn',function () {

        	// 当前用户的状态
		let isDelete = Number($(this).attr('data-isDelete'));

		// 用户ID
        let id = Number($(this).attr('data-id'));
        
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id,
                isDelete : isDelete === 1 ? 0 : 1,
                
            },
            success: function(res){
                if(!res.success) {
                    alert('接口调用失败')
                    return
                }
                location.reload();

            }
        })
    
     
    })
})