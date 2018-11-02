# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import hashlib
import random
import time

from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from Ml_S.models import User, Wheel1

#主页
def index(request):
    #轮播图
    whells = Wheel1.objects.all()
    # 获取cookie
    token = request.COOKIES.get('token')

    users = User.objects.filter(token=token)
    user = users.first()
    print(user.tel)
    return render(request, 'index.html', context={'tel': user.tel,'whells': whells})



def details(request):
    return render(request, 'details.html')



def tb_cart(request):
    token = request.COOKIES.get('token')
    users= User.objects.filter(token=token)
    user=users.first()
    return render(request, 'tb-cart.html', context={'tel':user.tel})



#注册
def register(request):
    if request.method=='GET':
        return render(request, 'register.html')


    elif request.method=='POST':
        tel=request.POST.get('tel')
        pword=request.POST.get('pword')
        #
        print(tel,pword)
        print("wocoa")



        user=User()
        user.tel=tel
        user.password=pword
        user.token = generate_token()
        user.save()
        print(user.token)

        response=redirect('ml:index')

        #讲token设为cookie
        response.set_cookie('token',user.token)
        return response
#生成token
def generate_token():

    token=str(time.time())+str(random.random())
    #md5加密:生成128位即16个字节
    md5=hashlib.md5()
    md5.update(token.encode('utf-8'))
    return md5.hexdigest()

#登录
def login(request):
    if request.method=='GET':
        return render(request, 'login.html')


    elif request.method=='POST':
        tel=request.POST.get("tel")
        pw=request.POST.get('pw')
        print(tel,pw)

        # 验证
        # 数据库能找到，登录成功
        # 数据库找不到，登录失败
        users = User.objects.filter(tel=tel).filter(password=pw)
        if users.count():  # 存在
            user = users.first()

            # 重定向首页
            response = redirect('ml:index')

            # 设置cookie
            response.set_cookie('token',user.token )

            return response

        else:
            return HttpResponse('用户名或密码错误!')

#退出
def logout(request):
    # 重定向首页
    response = redirect('ml:index')

    # 删除cookie
    response.delete_cookie('token')

    return response