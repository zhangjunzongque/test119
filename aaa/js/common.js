

$.ajax({
	url: '/employee/checkRootLogin',
	type: 'get',
	async: false,
	success: function(res){

		// if(res.error && res.error == 400){
		if(!res.success){

			location.href = "login.html";

		}
		
	}
});


$(function(){


	$('.login_out_bot').on('click', function() {
		if(!confirm('确定要退出吗？')) {
			return
		}
		$.ajax({
		
			url:"/employee/employeeLogin",
			
			success:function(res){
				if(!res.success) {
					alert(res.message)
					return
				}
				  // 退出成功
				location.href = "login.html";
			}
		});
	})















	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});