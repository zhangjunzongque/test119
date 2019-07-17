const storageKey = "keyArr";
$(function () {
    // let keyArr = [];
    $('.btn').on('click', function () {
        let keyWord = $('.text').val()
        if(!keyWord){
            alert('请输入关键字')
            return
        } 
        location.href = `search-result.html?keyWord=${keyWord}`
        

        keyArr.push(keyWord)
        localStorage.setItem('keyArr',JSON.stringify(keyArr))
    });
    // 清空数组
    $('#clear-btn').on('click',function (){
        keyArr = []
        // 清空html
        $('#history-box').html('')
        // 清空localStorage
        localStorage.removeItem(storageKey)
    })
    

    let keyArr = [];
    if(localStorage.getItem('keyArr')){
        keyArr = JSON.parse(localStorage.getItem('keyArr'))
        console.log(keyArr);
        let html = template('history-tpl',{result:keyArr})
        $('#history-box').html(html);
    }
})