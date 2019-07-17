
$(function () {
  //区分功能：是编辑还是添加
  let isEdit = Number(getParamsByUrl(location.href,'isEdit'))
  let addressObj = {}

  if(isEdit){
    //编辑的功能
    let editAddressStr = localStorage.getItem('editAddress')
    if(!editAddressStr){
      return
    }
    addressObj = JSON.parse(editAddressStr)
  }

  //初始化实例
  let html = template('editTpl',addressObj)
  $('#editForm').html(html)



  let picker = new mui.PopPicker({layer:3});

  // 为picker选择器添加数据
  picker.setData(cityData);

  $('#selectCity').on('tap',function () {

    //弹出选择框
    picker.show(function (selectItems) {
      console.log(selectItems);
      let address = ''
      for (let i = 0; i < selectItems.length; i++) {
        address += selectItems[i].text
      }
      $('#selectCity').val(address)
    })
  })


  $('#addAddress').on('tap',function () {
    let queryStr = $('#editForm').serialize()
    //let data = convertQueryToObject(queryStr)
    let recipients = $('input[name=recipients]').val();
    let postcode = $('input[name=postcode]').val();
    let address = $('input[name=address]').val();
    let addressDetail = $('input[name=addressDetail]').val();
    let data = {
      recipients,
      postcode,
      address,
      addressDetail,
    }
    let url = ''
    if(isEdit){
      data.id = addressObj.id
      url = '/address/updateAddress'
    }else {
      url = '/address/addAddress'
    }
    /*
    TODO:校验表单
    * */

    $.ajax({
      url,
      type:'post',
      data,
      success:function (response) {
        if(!response.success){
          mui.toast('出错！')
          return
        }
        if(isEdit){
          mui.toast('修改成功！')
        }else {
          mui.toast('添加成功！')
        }
        setTimeout(()=>{
          location  = 'address.html'
        },2000)
      }
    })
  })




})