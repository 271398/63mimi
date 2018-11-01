from django.conf.urls import url

from Ml_S import views

urlpatterns=[
    url(r'^$', views.index, name='index'),
    url(r'^details/$', views.details, name='details'),
    url(r'^login/$', views.login, name='login'),
    url(r'^register/$', views.register, name='register'),
    url(r'^tb-cart/$', views.tb_cart, name='tb-cart'),
    url(r'^logout/$', views.logout),
]