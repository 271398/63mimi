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
        print(user.tel)
        return render(request, 'index.html', context={'tel':user.tel,'whells': whells,'goods':goods})
    else:
        return render(request, 'index.html', context={'whells': whells,'goods':goods})
    #接下来在index中遍历使用，加入辅助标签



def details(request,id=1):
    token=request.session.get('token')
    goods=Goods.objects.filter(id=id)
    users = User.objects.filter(token=token)
    if users.count():
        user = users.first()
        print(user.tel)
        return render(request, 'details.html', context={'tel': user.tel,'goods':goods})
    else:
        return render(request, 'details.html',context={'goods':goods})



def tb_cart(request):
    token = request.session.get('token')
    users= User.objects.filter(token=token)
    if users.count():
        user = users.first()
        print(user.tel)
        return render(request, 'tb-cart.html', context={'tel':user.tel})
    else:
        return render(request, 'tb-cart.html')



#注册
def register(request):
    if request.method=='GET':
        return render(request, 'register.html')


    elif request.method=='POST':
        tel=request.POST.get('tel')
        password=request.POST.get('pword')
        #
        print(tel,password)
        print("wocoa")



        user=User()
        user.tel=tel
        user.password = generate_password(password)
        user.token = generate_token()
        user.save()
        print("好了")

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
        print(tel,password)
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
            request.session.set_expiry(60)
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
    print(goodsid)
    token=request.session.get('token')
    responseData={
        'msg':'添加购物车',
        'status':1#为1表示登录，为-1表示未登录
    }

    if token:
        user= User.objects.get(token=token)
        goods=Goods.objects.get(id=goodsid)



        carts=Cart.objects.filter(goods_id=goods.id).filter(user_id=user.id)
        if carts.exists():
            cart=carts.first()
            cart.number=cart.number + 1
            cart.save()
        else:
            cart=Cart()
            cart.goods=goods
            cart.user=user
            cart.number=1
            cart.save()


        return JsonResponse({'msg':"添加完成"})
    else:  #ajax操作不能进行重定向
        responseData['msg']='未登录'
        responseData['status']=-1
        return JsonResponse(responseData)


    #没有token的情况下加入 购物车 
    # return JsonResponse({'msg':"添加完成"})