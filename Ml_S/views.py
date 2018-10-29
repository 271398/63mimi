# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'index.html')


def details(request):
    return render(request, 'details.html')


def login(request):
    return render(request, 'login.html')


def register(request):
    return render(request, 'register.html')


def tb_cart(request):
    return render(request, 'tb-cart.html')