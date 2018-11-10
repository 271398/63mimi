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



    $('.c1').click(function(){
        var cartid=$(this).attr('cartid')
        var that=$(this)
        console.log(cartid)
        $.get('/xuan/',{'cartid':cartid},function(response){
            console.log()
            $('#i1').show().html(response.gj)
            that.children().remove()
            if (response.isselect){
                that.append('<span class="glyphicon glyphicon-ok" id="i4"></span>')
                console.log('1')
            }else{
                that.append('<span class="no" id="i4"></span>')
                console.log('2')
            }
        })
    });


    $('#i3').click(function () {
        var isselect=$(this).attr('isselect')

        isselect=(isselect =='false')?true:false
        $(this).attr('isselect',isselect)
        if (isselect){
            $(this).removeClass('no').addClass('glyphicon glyphicon-ok')
             $('#i').find('span').removeClass('no').addClass('glyphicon glyphicon-ok')
            $.get('/all/',function(response){
                console.log(response.a)
                 $('#i1').show().html(response.gj)
            })
        }else{
            $(this).removeClass('glyphicon glyphicon-ok').addClass('no')
            $('#i').find('span').removeClass('glyphicon glyphicon-ok').addClass('no')
            $.get('/allno/',function(response){
                console.log(response.a)
                 $('#i1').show().html(response.gj)
            })
        }

    });

    $('.shan').click(function () {
        var cartid=$(this).attr('cartid')
         $.get('/delect/',{'cartid':cartid},function (response) {
             $('#i1').show().html(response.gj)
             console.log(response.gj)
             $(this).remove()
             console.log('1')
         })

    })
})