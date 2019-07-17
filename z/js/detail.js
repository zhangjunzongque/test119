$(function (){
	
	// 库存数量
	var kucunNum = 0;

	// 尺码
	var size = null;
	let storageNum = 0;
	let id = getParamsByUrl(location.href, 'id');
	$.ajax({
		url: '/product/queryProductDetail',
		type: 'get',
		data: {
			id: id
		},
		success: function(res){
			console.log(res);
			// 库存数量
			kucunNum = res.num;
			// 产品ID
			productId = res.id;
			var html = template("productTpl", res);
			storageNum = res.num;
			$('#product-box').html(html);
			//获得slider插件对象
			var gallery = mui('.mui-slider');
			gallery.slider();

		}
	});

	$('#produst-box').on('tap','size span', function(){

		$(this).addClass('active').sibings().removeClass('active')
		size = Number($(this).html())
	})
	$('#reduce').on('tap', function() {
		let input = $('#inp')
		let currentNum = Number(input.val())
		currentNum = currentNum <= 1 ? 1 : currentNum-1
		input.val(currentNum)
	})
	$('#increase').on('tap', function() {
		let input = $('#inp')
		let currentNum = Number(input.val())
		currentNum = currentNum >= storageNum ? storageNum : currentNum+1
		console.log(currentNum,storageNum)
		input.val(currentNum)
		
	})

	// 加入购物车
	$('#addCart').on('tap',function () {
		if(!size){
		  mui.toast('请选择尺码！')
		  return
		}
		let input = $('#inp')
		let currentNum = Number(input.val())
		$.ajax({
		  url:'/cart/addCart',
		  type:'post',
		  data:{
			productId:id,
			num:currentNum,
			size,
		  },
		  success:function (res) {
			if(!res.success){
			  mui.toast('出错了！')
			  return
			}
			mui.confirm('是否想要去购物车看一看','温馨提示',function (message) {
			  // index 1-确认 0-取消
			  if(message.index === 0){
				return
			  }
			  location = 'cart.html'
			})
		  }
		})
	  })
	})