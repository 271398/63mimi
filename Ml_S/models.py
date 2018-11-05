# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
class User(models.Model):
    tel=models.CharField(max_length=600)
    password=models.CharField(max_length=600)
    token=models.CharField(max_length=256,default='')
    class Meta:
        db_table='user'

class Goods(models.Model):
    headIng=models.CharField(max_length=600)
    name=models.CharField(max_length=300)
    prince=models.IntegerField()
    unit=models.CharField(max_length=100)
    ltilep=models.CharField(max_length=100,default='')
    class Meta:
        db_table='goods'

class Wheel1(models.Model):
    headIng=models.CharField(max_length=600)
    name=models.CharField(max_length=300)
    class Meta:
        db_table='wheel'


