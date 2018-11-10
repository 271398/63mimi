$(function () {
    $('.jia').click(function () {
        var godsid=$(this).attr('godsid')
        console.log(godsid)
        $.get('/ag/',{'goodsid':godsid},function (response) {
             console.log(response)
        })
    })

})