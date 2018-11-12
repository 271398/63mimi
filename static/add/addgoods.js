$(function () {
    $('.addgds').click(function () {
        var goodsid=$(this).attr('goodsid')
        var a=$(".number").html()
        console.log(a)
        $.get('/addgds/', {'goodsid':goodsid,'a':a},function (response) {
            console.log(response)
            if (response.status == -1){
                window.open('/login/', target="_self")
            }
        })
    });


    $('.jian').click(function () {
        var goodsid=$(this).attr('goodsid')
        var that=$(this)
        $.get('/jg/',{'goodsid':goodsid},function (response) {
             console.log(response)
            if (response.status == -1){
                window.open('/login/', target="_self")
            }else{
                $('#i9').show().html(response.number)
                $('#i1').show().html(response.gj)
            }
        })
    });


    $('.jia').click(function () {
        var goodsid=$(this).attr('goodsid')
        var that = $(this)
        console.log(goodsid)
        $.get('/ag/',{'goodsid':goodsid},function (response) {
            if (response.status == -1){
                window.open('/login/', target="_self")
            }
            else{
                console.log(response.number)
                $('#i9').show().html(response.number)
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
        var that=$(this)
         $.get('/delect/',{'cartid':cartid},function (response) {
             $('#i1').show().html(response.gj)
             console.log(response.gj)
             that.parent().parent().remove()
             console.log('1')
         })

    });



    $('.add').click(function () {
        var a=$('.number').html()
        console.log(a)
        $.get('/dadd/',{'a':a},function (response) {
            console.log(response.a)
            $('.number').show().html(response.a)
            // $('#i10').children().remove()
            // $('#i10').append('<span class="num" >response.a</span>')
        })

    });


    $('.mtp').click(function () {
        var a=$('.number').html()
        console.log(a)
        $.get('/djian/',{'a':a},function (response) {
            console.log(response.a)
                $('.number').show().html()
            $('.number').show().html(response.a)

        })

    });
})