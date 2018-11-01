# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from Ml_S.models import User, Wheel1


def index(request):
    # 获取cookie
    tel = request.COOKIES.get('tel')

    #轮播图
    whells= Wheel1.objects.all()

    return render(request,'index.html',context={'tel':tel,'whells':whells})


def details(request):
    return render(request, 'details.html')



def tb_cart(request):
    tel = request.COOKIES.get('tel')
    return render(request, 'tb-cart.html' ,context={'tel':tel})




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
        user.save()

        # response=redirect('ml:index')
        #
        #
        # response.set_cookie('tel',tel)
        return render(request,'index.html')




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
            response.set_cookie('tel', tel)

            return response

        else:
            return HttpResponse('用户名或密码错误!')

#退出
def logout(request):
    # 重定向首页
    response = redirect('ml:index')

    # 删除cookie
    response.delete_cookie('tel')

    return response