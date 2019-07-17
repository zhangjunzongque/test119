
$(function(){

	// 初始化区域滚动组件
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	// 向一级分类发送请求
	$.ajax({
		url:"/category/queryTopCategory", //一级分类 接口
		type:"get",
		success:function(response){
			let html = template("category-first", response)
			$('#links').html(html);
				// 如果一级分类有数据的话
			if(response.rows.length) {
				// 给第一个一级分类添加选中状态
				// $('#links').find('a').eq(0).addClass('active')
				// let id = response.rows[0].id;
				// 	getSecondCategory (id)
				$('#links').find('a').eq(0).click()
			}
		}
	});
	// 请求二级分类
	$("#links").on('click','a',function(){
		
		let id = $(this).attr('data-id');
		// 点击的高亮
		$(this).addClass('active').siblings().removeClass('active');
		// 3.调用接口 获取数据
		getSecondCategory (id)
	})
	function getSecondCategory (id) {
		$.ajax({
			url: '/category/querySecondCategory',
			type: 'get',
			data: {
				id: id
			},
			success:function(response) {
				let html = template('category-second',response);
				$('.brand-list').html(html);
			}
		})
	}
})


