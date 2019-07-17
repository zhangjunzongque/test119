  $(function () {
     $('#login-btn').on('tap', function () {
     var username = $('input[name="username"]').val()
     var password = $('input[name="password"]').val()

     $.ajax({
      url:'/user/login',
      data:{
        username,
        password,
      },
      type:'post',
      beforeSend:function() {
        $('#login-btn').html('正在登录...')
      },
      success:function (response) {
        if(!response.success){
          mui.toast(response.error)
          return
        }
        mui.toast('登录成功')
        setTimeout(()=>{
          location.href = 'user.html'
        },2000)
      }
    })


   }) 

  })