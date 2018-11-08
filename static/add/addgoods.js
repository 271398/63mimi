$(function () {
    $('.addgds').click(function () {
        var goodsid=$(this).attr('goodsid')
        console.log(goodsid)
        $.get('/addgds/', {'goodsid':goodsid},function (response) {
            console.log(response)
            if (response.status == -1){
                window.open('/login/', target="_self")
            }
        })
    })
})