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
    });


    $('.jian').click(function () {
        var goodsid=$(this).attr('goodsid')
        var that=$(this)
        console.log(goodsid)
        $.get('/jg/',{'goodsid':goodsid},function (response) {
             console.log(response)
            if (response.status == -1){
                window.open('/login/', target="_self")
            }else{
                that.next().show().html(response.number)
                $('#i1').show().html(response.gj)
            }
        })
    });


    $('.jia').click(function () {
        var goodsid=$(this).attr('goodsid')
        var that = $(this)
        console.log(goodsid)
        $.get('/ag/',{'goodsid':goodsid},function (response) {
             console.log(response)
            if (response.status == -1){
                window.open('/login/', target="_self")
            }
            else{
                that.prev().show().html(response.number)
                $('#i1').show().html(response.gj)
            }
        })
    });



    $('#i4').click(function(){
        var goodsid=$(this).attr('goodsid')
        console.log(goodsid)
        $.get('/xuan/',{'goodsid':goodsid},function(response){
            $('#i1').show().html(response.gj)
        })
    })
})