let userInfo = null
$.ajax({

    url:"user/queryUserMessage",
    anync: false,
    success:function(response){
       if(response.error === 400){
       location = 'index.html'
       return
    }
        console.log(response);
        userInfo = response
    }
});

$(function() {
    //注意id 和clas类名不要写错了，
  $("#logout").on("tap", function() {
    $.ajax({
      url: "/user/logout",
      success: function(response) {
        if (!response.success) {
          mui.toast(response.error)
          return
        }
        mui.toast("退出登录成功")
        setTimeout(() => {
          location = "index.html"
        }, 2000)
      }
    });
  });
  let html = template('user-tpl',userInfo)
  $('#userInfoBox').html(html)
});
