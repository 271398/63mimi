# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import hashlib
import random
import time

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from Ml_S.models import User, Wheel1, Goods, Cart


#主页
def index(request):
    #轮播图
    whells = Wheel1.objects.all()
    # 获取cookie
    # token = request.COOKIES.get('token')
    #商品详情
    goods = Goods.objects.all()[0:3]
    # for goods in goods:
    #     print(goods.id)

    token = request.session.get('token')
    users = User.objects.filter(token=token)
    if users.count():
        user = users.first()
        # print(user.tel)
        return render(request, 'index.html', context={'tel':user.tel,'whells': whells,'goods':goods})
    else:
        return render(request, 'index.html', context={'whells': whells,'goods':goods})
    #接下来在index中遍历使用，加入辅助标签


#详情页
def details(request,id=1):
    token=request.session.get('token')
    goods=Goods.objects.filter(id=id)
    users = User.objects.filter(token=token)
    if users.count():
        user = users.first()
        # print(user.tel)
        return render(request, 'details.html', context={'tel': user.tel,'goods':goods})
    else:
        return render(request, 'details.html',context={'goods':goods})






#注册
def register(request):
    if request.method=='GET':
        return render(request, 'register.html')


    elif request.method=='POST':
        tel=request.POST.get('tel')
        password=request.POST.get('pword')
        #
        # print(tel,password)



        user=User()
        user.tel=tel
        user.password = generate_password(password)
        user.token = generate_token()
        user.save()

        response=redirect('ml:index')

        #讲token设为cookie
        # response.set_cookie('token',user.token)
        # return response
        #设置session
        request.session['token'] = user.token
        request.session.set_expiry(60)
        return response



#登录
def login(request):
    if request.method=='GET':
        return render(request, 'login.html')


    elif request.method=='POST':
        tel=request.POST.get("tel")
        password=request.POST.get('pw')
        # print(tel,password)
        password = generate_password(password)

        # 验证
        # 数据库能找到，登录成功
        # 数据库找不到，登录失败
        users = User.objects.filter(tel=tel).filter(password=password)
        if users.count():  # 存在
            user = users.first()

            # 重定向首页
            # response = redirect('ml:index')

            # 设置cookie
            # response.set_cookie('token',user.token )
            #
            # return response
            request.session['token'] = user.token
            request.session.set_expiry(600)
            return redirect('ml:index')

        else:
            return HttpResponse('用户名或密码错误!')

#退出
def logout(request):
    # 重定向首页
    response = redirect('ml:index')
    #
    # # 删除cookie
    # response.delete_cookie('token')
    request.session.flush()
    return response

#生成token
def generate_token():

    token=str(time.time())+str(random.random())
    #md5加密:生成128位即16个字节
    md5=hashlib.md5()
    md5.update(token.encode('utf-8'))
    return md5.hexdigest()


#password加密
def generate_password(password):
    sha = hashlib.sha512()
    sha.update(password.encode('utf-8'))
    return sha.hexdigest()

#添加购物车的ajax请求
def addgds(request):
    goodsid=request.GET.get('goodsid')
    a=request.GET.get('a')
    a=int(a)
    print(goodsid)
    print(a)
    token=request.session.get('token')
    responseData={
        'msg':'添加购物车',
        'status':1#为1表示登录，为-1表示未登录
    }

    if token:
        user= User.objects.get(token=token)
        goods=Goods.objects.get(id=goodsid)



        carts=Cart.objects.filter(goods_id=goods).filter(user_id=user)
        if carts.exists():
            cart=carts.first()
            cart.number=cart.number + a
            cart.save()
        else:
            cart=Cart()
            cart.goods=goods
            cart.user=user
            cart.number=a
            cart.save()


        return JsonResponse({'msg':"添加完成"})
    else:  #ajax操作不能进行重定向
        responseData['msg']='未登录'
        responseData['status']=-1
        return JsonResponse(responseData)


    #没有token的情况下加入 购物车 
    # return JsonResponse({'msg':"添加完成"})



#购物车商品展示
def tb_cart(request):
    token = request.session.get('token')
    users= User.objects.filter(token=token)
    if users.count():
        user = users.first()
        # print(user.tel)
        # print(user.id)
        carts=Cart.objects.filter(user_id=user.id)
        a=len(carts)
        gongj=0
        for cart in carts:
            # print(cart.goods_id)
            goods=Goods.objects.get(id=cart.goods_id)
            if cart.isselect==1 and cart.number>0:

                gongj = gongj + goods.prince * cart.number
            else:
                a=a-1

        data = {
            'goods': Goods.objects.all(),
            'tel': user.tel,
            'carts': carts,
            'a': a,
            'gj':gongj
        }
        return render(request, 'tb-cart.html', context=data)
    else:
        return render(request, 'tb-cart.html')


#商品数量增加
def ag(request):
    goodsid=request.GET.get('goodsid')
    token=request.session.get('token')
    user= User.objects.get(token=token)
    goods=Goods.objects.get(id=goodsid)
    ids = user.id
    # print(user.id,goodsid)

    carts = Cart.objects.filter(goods_id=goods).filter(user_id=user)
    cart = carts.first()
    cart.number = cart.number + 1
    cart.save()

    responseData = {
    }
    responseData['gj'] = gongji(ids)
    responseData['number']=cart.number

    return JsonResponse(responseData)


#商品数量减少
def jg(request):
    goodsid = request.GET.get('goodsid')
    # print(goodsid)
    token = request.session.get('token')
    user = User.objects.get(token=token)
    goods = Goods.objects.get(id=goodsid)
    ids=user.id

    carts = Cart.objects.filter(goods_id=goods).filter(user_id=user)
    cart = carts.first()
    cart.number = cart.number - 1
    cart.save()

    responseData = {
    }
    responseData['gj']=gongji(ids)
    responseData['number'] = cart.number
    return JsonResponse(responseData)


#单件单件商品选中
def xuan(request):
    cartid=request.GET.get('cartid')
    token = request.session.get('token')
    user = User.objects.get(token=token)
    ids = user.id
    carts = Cart.objects.filter(id=cartid)
    cart = carts.first()
    print(cart.isselect)
    if cart.isselect:
        cart.isselect=False
    else:
        cart.isselect=True
    cart.save()

    # print(goodsid)
    print(cart.id)
    responseData={
        'isselect':cart.isselect
    }
    responseData['gj'] = gongji(ids)
    print(gongji(ids))

    return JsonResponse(responseData)



#全选
def all(request):
    token = request.session.get('token')
    user = User.objects.get(token=token)
    ids = user.id
    carts = Cart.objects.filter(user_id=user.id)
    for cart in carts:
        cart.isselect = True
        cart.save()
    a=len(carts)
    responseData = {
        'a':a
    }
    responseData['gj'] = gongji(ids)
    return JsonResponse(responseData)



#全不选
def allno(request):
    token = request.session.get('token')
    user = User.objects.get(token=token)
    ids = user.id
    carts = Cart.objects.filter(user_id=user.id)
    for cart in carts:
        cart.isselect = False
        cart.save()
    a=len(carts)
    responseData = {
        'a':a
    }
    responseData['gj'] = gongji(ids)
    return JsonResponse(responseData)

#删除商品
def delect(request):
    cartid = request.GET.get('cartid')
    print(cartid)
    carts = Cart.objects.get(id=cartid).delete()
    token = request.session.get('token')
    user = User.objects.get(token=token)
    ids = user.id
    responseData = {
    }
    responseData['gj'] = gongji(ids)
    return JsonResponse(responseData)


#总价计算
def gongji(id):#此处Id为购物车的用户id
    carts = Cart.objects.filter(user_id=id)
    gongj = 0
    for cart in carts:
        # print(cart.goods_id)
        goods = Goods.objects.get(id=cart.goods_id)
        if cart.isselect == 1:
            gongj = gongj + goods.prince * cart.number
    return gongj


def dadd(request):
    a = request.GET.get('a')
    a = int(a)
    a=a+1
    responseData = {
        'a':a
    }
    print(a)
    return JsonResponse(responseData)


def djian(request):
    number = request.GET.get('a')
    a = int(number)-1
    responseData = {
    }
    responseData['a'] = a
    print(a)
    return JsonResponse(responseData)