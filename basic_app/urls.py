from django.urls import path, re_path
from . import views

app_name = 'basic_app'

urlpatterns = [
    path('', views.index, name='index'),
    path('meyorlar', views.ClassMain1Menu.as_view(), name='main1'),
    path('qo\'llanmalar', views.main2, name='main2'),
    path('materiallar', views.ClassMain3.as_view(), name='main3'),
    path('muddatli_kurslar', views.ClassMain4.as_view(), name='main4'),
    path('guvohnomalar', views.home5, name='home5'),
    path('kasb va mutaxasislik/<int:pk>', views.ClassHome1Menu.as_view(), name='home1'),
    path('o\'quv qo\'llanma/<int:pk>', views.ClassHome2.as_view(), name='home2'),
    path('o\'qitish materiallari/<int:pk>', views.ClassHome3.as_view(), name='home3'),
    path('kurslar/<int:pk>', views.ClassHome4.as_view(), name='home4'),
    path('jurnallar', views.ClassMain5.as_view(), name='main5'),
    path('foydali', views.main6, name='main6'),
    path('muhokama', views.MuhokamaView.as_view(), name='muhokama'),
    path('muhokama/<int:pk>', views.MuhokamaDetail.as_view(), name='muhokama_detail'),
    path('news/<int:pk>', views.NewsDetail, name='news'),
    path('meyor_search', views.meyor_search, name='meyor_search')
]
