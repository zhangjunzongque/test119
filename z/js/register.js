// 当页面HTML结构加载完成以后
$(function () {
  function getParamsByUrl(queryStr) {
    let arr = queryStr.split('&')
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      let target = arr[i].split('=')
      obj[target[0]] = target[1]
    }
    return obj
  }


  function formValidator(formObj) {
    let {againPass,mobile,password,username,vCode} = formObj
    if(!username){
      mui.toast("请输入用户名")
      return false;
    }

    if(mobile.length < 11){
      mui.toast("请输入合法的手机号")
      return false;
    }

    if(password != againPass){
      mui.toast("两次输入的密码不一样")
      return false;
    }

    if(vCode.length !== 6){
      mui.toast("验证码位数不对")
      return false
    }
    return true
  }

  $("#register-btn").on("tap", function() {
    let queryStr = $("#register-form").serialize();
    let formData = getParamsByUrl(queryStr);
    let { againPass, mobile, password, username, vCode } = formData;
    console.log(againPass,mobile,password,username,vCode);

    let isLegal = formValidator(formData);
    if (!isLegal) {
      return;
    }

    $.ajax({
      type: "post",
      data: formData,
      url: "/user/register",
    
      success: function(response) {
        if (!response.success) {
          alert(response.error);
        }
        setTimeout(() => {
          location.href = "login.html";
        }, 2000);
      }
    });
  });

  $("#getCode").on("tap", function() {
    $.ajax({
      type: "get",
      url: "/user/vCode",
      success: function(response) {
        console.log(response.vCode);
      }
    });
  });
});
