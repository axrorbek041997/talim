from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

app_name = 'user_app'

urlpatterns = [
    path('', views.createUser, name='index'),
    path('code/', views.code, name='code'),
    path('my-login/', views.my_login, name='login'),
    path('logout', auth_views.LogoutView.as_view(), name='logout'),
    path('video', views.video, name='video'),
    path('user-muhokama', views.user_muhokama, name='user_muhokama')
]
