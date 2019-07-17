

$(function() {
	
		
	// // 存储收货地址
	let address = null;

	$.ajax({
		url: '/address/queryAddress',
		// type: 'get',
		success: function(response) {
		//   console.log(response);
			  address = response;
	
		  var html = template("address-tpl",{result:response});
	
		  $('#address-box').html(html);
	
		}
	  })

	 
	
		$('#address-box').on('tap','.delete-btn',function(){

			var id = this.getAttribute('data-id');
	
			var li = this.parentNode.parentNode;
	
			mui.confirm("确认要删除吗?",function(message){
	
				// 确认删除
				if(message.index == 1) {
					$.ajax({
						url: '/address/deleteAddress',
						type: 'post',
						data: {
							id: id
						},
						success: function(res){
							// 删除成功
							if(res.success){
								// 重新加载当前页面
								location.reload();
							}
						}
					})
				}else{
					// 取消删除
					// 关闭列表滑出效果
					mui.swipeoutClose(li);
				}
			});
		});
	
		/**
		 * 编辑收货地址
		 * 1.给编辑按钮添加点击事件
		 * 2.跳转到收货地址编辑页面 并且要将编辑的数据传递到这个页面
		 * 3.将数据展示在页面中
		 * 4.给确定按钮添加点击事件
		 * 5.调用接口 执行编辑操作
		 * 6.跳转回收货地址列表页面
		 */
		
		$('#address-box').on('tap', '.edit-btn', function(){
			var id = this.getAttribute('data-id');
			for(var i=0;i<address.length;i++) {
				if(address[i].id == id) {
					localStorage.setItem('editAddress',JSON.stringify(address[i]));
					// 终止循环
					break;
				}
			}
			// 跳转到编辑页面
			location.href = "addAddress.html?isEdit=1";
		});
	});





