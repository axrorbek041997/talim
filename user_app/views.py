from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.template import RequestContext

from .models import HududTuman, HududViloyat, UserMuhokama
from django.contrib.auth import get_user_model
import random as rm
from .sms_generator import sendSMS
import re
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail


# Create your views here.
def createUser(request):
    User = get_user_model()
    if request.is_ajax() and request.method == 'GET':
        code = 0

        is_name = bool(User.object.filter(name=request.GET.get('name')))
        is_phone = bool(User.object.filter(user_phone=request.GET.get('tel')))

        if not (is_name or is_phone):
            code = str(rm.randint(100000, 999999))
            # +998 (93) 888-89-89
            phone = ''.join(re.findall(r'\+(998)\s?\((\d{2})\)\s?(\d{3})-(\d{2})-(\d{2})', request.GET.get('tel'))[0])
            sendSMS(phone=phone, code=code)

        return JsonResponse({'is_phone': is_phone, 'is_name': is_name, 'code': code})
    else:
        return redirect('basic_app:index')


def code(request):
    User = get_user_model()
    if request.is_ajax() and request.method == "GET":
        user = User(name=request.GET.get('name'), viloyat=HududViloyat.objects.get(id=request.GET.get('viloyat')),
                    tuman=HududTuman.objects.get(id=request.GET.get('tuman')), muassasa=request.GET.get('muassasa'),
                    is_type=request.GET.get('is_type'), lavozimi=request.GET.get('lavozim'),
                    user_phone=request.GET.get('tel'), is_staff=False, is_active=True, is_superuser=False)
        user.set_password(request.GET.get('parol'))
        user.save()

        return JsonResponse({'res': True})
    else:
        return redirect('basic_app:index')


def my_login(request):
    if request.is_ajax() and request.method == "GET":
        if re.findall(r'\+(998)\s?\((\d{2})\)\s?(\d{3})-(\d{2})-(\d{2})', request.GET.get('phone')):
            user = authenticate(request, user_phone=request.GET.get('phone'), password=request.GET.get('password'))
            t = False
            if user is not None:
                login(request, user)
                t = True
                # return redirect('basic_app:index')
            return JsonResponse({"is_auth": t})
        else:
            return JsonResponse({'is_auth': False})
    else:
        return redirect("basic_app:index")


def video(request):
    if request.is_ajax() and request.method == 'GET':
        tum = list(HududTuman.objects.filter(viloyat_id=request.GET.get('viloyat_id')).values('id', 'name'))
        return JsonResponse({'tum': tum})
    else:
        return redirect('basic_app:index')


def user_muhokama(request):
    if request.is_ajax() and request.method == "GET":
        muh = UserMuhokama(user=request.user, title=request.GET.get('title'), idea=request.GET.get('text'))
        mail = send_mail("Metodik Ta'minot Platformasi",
                         text.format(user=request.user, tel=request.user.user_phone, hujjat=request.GET.get('title'),
                                     izoh=request.GET.get('text')),
                         'edu.profedu.uz@gmail',
                         ['e.ergashev1704@gmail.com', 'auabdul87@gmail.com', 'sherikshox@bk.ru'])
        if mail:
            muh.save()
            return JsonResponse({'res': True})
        else:
            return JsonResponse({'res': False})


text = '''
    Izoh yuboruvchi: {user}
    Tel: {tel},
    O'quv meyoriy hujjat: {hujjat},
    Izoh: {izoh}
'''
