$.ajax({
	url: '/employee/checkRootLogin',
	type: 'get',
	async: false,
	success: function(res){

		if(res.success){

			location.href = "user.html";

		}
		
	}
});

$(function () {
    $('#login').on('click',function (){

        var username = $.trim($("[name='username']").val());
		var password = $.trim($("[name='password']").val());
        console.log(username,password)
        if(username === '') {
            alert('用户名不为空')
            return
        }
        if(password === '') {
            alert('用户名不为空')
            return
        }

        $.ajax({
            type:"post",
            data:{
                username,
                password
            },
            url:"/employee/employeeLogin",
            
            success:function(res){

                console.log(11111)
                if(!res.success) {
                    alert(res.message)
                    return
                }
               // 登录成功
                location.href = "user.html";
            }
        });
    })
})