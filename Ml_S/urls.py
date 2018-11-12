from django.conf.urls import url

from Ml_S import views

urlpatterns=[
    url(r'^$', views.index, name='index'),
    url(r'^login/$', views.login, name='login'),
    url(r'^register/$', views.register, name='register'),
    url(r'^tb-cart/$', views.tb_cart, name='tb-cart'),
    url(r'^logout/$', views.logout),
    url(r'^details/(\d+)/$', views.details, name='details'),
# 添加购物车的请求
    url(r'^addgds/$',views.addgds,name='addgds'),
# 商品数量增加的请求
    url(r"^ag/$",views.ag,name='jia'),
    url(r"^dadd/$",views.dadd,name='dadd'),
#商品数量减少
    url(r"^jg/$",views.jg,name='jian'),
    url(r'^djian/$',views.djian,name='djian'),
#商品选中
    url(r'^xuan/$',views.xuan,name='xuan'),
#全选
    url(r'^all/$',views.all,name='all'),
#全不选
    url(r'^allno/$',views.allno,name='allno'),
#删除
    url(r'^delect/$',views.delect,name='del'),
]