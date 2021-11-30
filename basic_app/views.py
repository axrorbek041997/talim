from django.core.paginator import Paginator
from django.db.models import Q, Subquery, F, Sum
from django.forms import model_to_dict
from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.views import generic
from . import models
from user_app.models import HududTuman, HududViloyat
from django.contrib.auth import get_user_model
from django.views.decorators.clickjacking import xframe_options_exempt
import pickle


# Create your views here.
def index(request):
    newsdata = models.Yangilik.objects.all().order_by("-date")
    per_page = 4
    obj_paginator = Paginator(newsdata, per_page)
    first_page = obj_paginator.page(1).object_list
    page_range = obj_paginator.page_range

   # a1 = models.KasbVaMutaxasislik.objects.aggregate(Sum('view'))
  #  a2 = models.UquvQullanma.objects.aggregate(Sum('view'))
 #   a3 = models.UquvMaterial.objects.aggregate(Sum('view'))
#    print(a1['view__sum'] + a2['view__sum'] + a3['view__sum'])

    q = len(models.UquvQullanma.objects.all())
    m = len(models.UquvMaterial.objects.all())
    k = len(models.QisqaMuddatliKurslar.objects.all())
    mey = len(models.KasbVaMutaxasislik.objects.all())
    vil = HududViloyat.objects.all().order_by('name')
    tum = HududTuman.objects.all().order_by('name')
    user_len = len(get_user_model().object.all())

    uq_mat = models.KasbVaMutaxasislik.objects.filter(view__gt=0).order_by('-view')[:10]
    f = models.SizUchunFoydali.objects.all()

    context = {
        'obj_paginator': obj_paginator,
        'first_page': first_page,
        'page_range': page_range,
        'q': q, 'm': m, 'k': k, 'mey': mey, "vil": vil, 'tum': tum, 'user_len': user_len,
        'more_seen': uq_mat,
        'foydali': f
    }

    # create_slug()

    if request.method == 'GET' and request.is_ajax():
        page_no = request.GET.get('page_no', None)
        results = list(obj_paginator.page(page_no).object_list.values())
        return JsonResponse({"results": results})

    return render(request, "base.html", context=context)


def create_slug():
    muh = models.Muhokama.objects.filter(slug__isnull=True)
    for i in muh:
        i.save()

    a = models.KasbVaMutaxasislik.objects.filter(slug__isnull=True)
    for i in a:
        i.save()

    u_qul = models.UquvQullanma.objects.filter(slug__isnull=True)
    for i in u_qul:
        i.save()

    q_kur = models.QisqaMuddatliKurslar.objects.filter(slug__isnull=True)
    for i in q_kur:
        i.save()

    U_mat = models.UquvMaterial.objects.filter(slug__isnull=True)
    for i in U_mat:
        i.save()


class ClassMain1Menu(generic.ListView):
    template_name = 'main1.html'
    context_object_name = 'uquv_hujjatlar'
    model = models.KasbVaMutaxasislik
    kasb_list = []

    def dispatch(self, request, *args, **kwargs):
        response = super(ClassMain1Menu, self).dispatch(request, *args, **kwargs)
        if request.is_ajax() and request.method == "GET":
            if request.GET.get('selected') == 'soxa':
                sox = models.TalimSoxasi.objects.get(name=request.GET.get('sox'))
                yun = models.TalimYunalishi.objects.filter(tSoxa_id=sox)
                k_va_m = models.KasbVaMutaxasislik.objects.filter(tYunalish_id__in=Subquery(yun.values('id')))

                d = {
                    'yun': list(yun.values()),
                    'kasb': list(k_va_m.values())
                }
                return JsonResponse(d)
            elif request.GET.get('selected') == 'yunalish':
                yun = models.TalimYunalishi.objects.get(name=request.GET.get('yun'))
                k_va_m = models.KasbVaMutaxasislik.objects.filter(tYunalish_id=yun)
                d = {
                    'kasb': list(k_va_m.values())
                }
                return JsonResponse(d)
            elif request.GET.get('selected') == 'daraja':
                if request.GET.get('t_yun'):
                    yun = models.TalimYunalishi.objects.get(name=request.GET.get('t_yun'))
                    return JsonResponse({'kasb': list(models.KasbVaMutaxasislik.objects.filter(tYunalish_id=yun,
                                                                                               _id__startswith=request.GET.get(
                                                                                                   't_daraja')).values())})
                elif request.GET.get('t_soxa'):
                    sox = models.TalimSoxasi.objects.get(name=request.GET.get('t_soxa'))
                    yun = models.TalimYunalishi.objects.filter(tSoxa_id=sox)
                    k_va_m = models.KasbVaMutaxasislik.objects.filter(tYunalish_id__in=Subquery(yun.values('id')),
                                                                      _id__startswith=request.GET.get('t_daraja'))
                    return JsonResponse({'kasb': list(k_va_m.values())})
                elif request.GET.get('b_soxa') and request.GET.get('b_soxa') != 'Barcha bilim sohasi':
                    sox = models.TalimSoxasi.objects.filter(
                        bilim_id=models.BilimSoxasi.objects.get(name=request.GET.get('b_soxa')))
                    yun = models.TalimYunalishi.objects.filter(tSoxa_id__in=Subquery(sox.values('id')))
                    k_va_m = models.KasbVaMutaxasislik.objects.filter(tYunalish_id__in=Subquery(yun.values('id')),
                                                                      _id__startswith=request.GET.get('t_daraja'))
                    return JsonResponse({'kasb': list(k_va_m.values())})
                else:
                    return JsonResponse({'kasb': list(
                        models.KasbVaMutaxasislik.objects.filter(
                            _id__startswith=request.GET.get('t_daraja')).values())})
            elif request.GET.get('selected') == 'pagination':
                try:
                    ids = [i.id for i in self.kasb_list.page(int(request.GET.get('page_number'))).object_list]
                    return JsonResponse({'kasb': list(models.KasbVaMutaxasislik.objects.filter(id__in=ids).values())})
                except:
                    return JsonResponse({'kasb': []})
            elif request.GET.get('selected') != 'Barcha bilim sohasi':
                t_soxa = models.TalimSoxasi.objects.filter(
                    bilim_id=models.BilimSoxasi.objects.get(name=request.GET.get('selected')))
                soxa = list(t_soxa.values('id', '_id', 'name'))

                t_yunal = list(
                    models.TalimYunalishi.objects.filter(tSoxa_id__in=Subquery(t_soxa.values('id'))).values())
                yun = models.TalimYunalishi.objects.filter(tSoxa_id__in=Subquery(t_soxa.values('id')))

                k_va_m = models.KasbVaMutaxasislik.objects.filter(tYunalish_id__in=Subquery(yun.values('id')))

                d = {
                    'soxa': soxa,
                    'yun': t_yunal,
                    'kasb': list(k_va_m.values()),
                    'size': len(k_va_m)
                }
                return JsonResponse(d, status=200, safe=False)
            else:
                d = {
                    'soxa': list(models.TalimSoxasi.objects.all().values("name")),
                    'yun': list(models.TalimYunalishi.objects.all().values("name")),
                    'kasb': list(models.KasbVaMutaxasislik.objects.all().values('id', '_id', "name", "img")),
                    'size': len(models.KasbVaMutaxasislik.objects.all().values('id', '_id', "name", "img"))
                }
                return JsonResponse(d, status=200, safe=False)

        else:
            return response

    def get_queryset(self):
        k_va_m = models.KasbVaMutaxasislik.objects.all()
        self.kasb_list = Paginator(k_va_m, 10)
        return self.kasb_list.page(1).object_list

    def get_context_data(self, **kwargs):
        context = super(ClassMain1Menu, self).get_context_data(**kwargs)
        context['bilim_soxa'] = models.BilimSoxasi.objects.all()
        context['talim_soxa'] = models.TalimSoxasi.objects.all()
        context['talim_yunalish'] = models.TalimYunalishi.objects.all()
        context['size'] = len(models.KasbVaMutaxasislik.objects.order_by('name'))
        context['vil'] = HududViloyat.objects.all().order_by('name')
        context['tum'] = HududTuman.objects.all().order_by('name')
        return context


def meyor_search(request):
    if request.is_ajax() and request.method == 'GET':
        search = request.GET.get('search')
        return JsonResponse({'kasb': list(
            models.KasbVaMutaxasislik.objects.filter(Q(_id__contains=search) | Q(name__contains=search)).values())})
    else:
        redirect('basic_app:meyorlar')


@xframe_options_exempt
def main2(request):
    q = models.UquvQullanma.objects.all().order_by("name")
    b = models.BilimSoxasi.objects.all()
    t = models.TalimSoxasi.objects.all()
    vil = HududViloyat.objects.all().order_by('name')
    tum = HududTuman.objects.all().order_by('name')

    if request.is_ajax() and request.method == "GET":
        is_auth = request.user.is_authenticated
        if request.GET.get('selected') != 'Barcha bilim sohasi':
            b = models.BilimSoxasi.objects.get(name=request.GET.get('selected'))
            soxa = b.bilim.all()
            s = list(soxa.values('id', 'name'))
            q = list(models.UquvQullanma.objects.filter(tSoxa_id__in=soxa).values('id', 'name', 'definition', 'img', 'prof_stand', 'tSoxa_id__name'))

            return JsonResponse({'s': s, 'q': q, 'auth': is_auth}, status=200, safe=False)
        else:
            s = list(models.TalimSoxasi.objects.all().values('id', 'name'))
            q = list(models.UquvQullanma.objects.all().values('id', 'name', 'definition', 'img', 'prof_stand', 'tSoxa_id__name'))
            return JsonResponse({'s': s, 'q': q, 'auth': is_auth})

    return render(request, 'main2.html', {"uquv_qullanma": q, 'bilim_soxa': b, 'talim_soxa': t, 'vil': vil, 'tum': tum})


class ClassMain3(generic.ListView):
    template_name = "main3.html"
    context_object_name = "uquv_materail"
    model = models.UquvMaterial

    def get_queryset(self):
        return models.UquvMaterial.objects.order_by("name")

    def get_context_data(self, **kwargs):
        context = super(ClassMain3, self).get_context_data(**kwargs)
        context['bilim_soxa'] = models.BilimSoxasi.objects.all()
        context['talim_soxa'] = models.TalimSoxasi.objects.all()
        context['vil'] = HududViloyat.objects.all().order_by('name')
        context['tum'] = HududTuman.objects.all().order_by('name')
        return context

    def dispatch(self, request, *args, **kwargs):
        response = super(ClassMain3, self).dispatch(request, *args, **kwargs)
        auth = request.user.is_authenticated
        if request.is_ajax() and request.method == 'GET':
            if request.GET.get('selected') != 'Barcha bilim sohasi':
                b = models.BilimSoxasi.objects.get(name=request.GET.get('selected'))
                soxa = models.TalimSoxasi.objects.filter(bilim_id=b)

                s = list(soxa.values('id', 'name'))
                q = []
                for i in soxa:
                    q.extend(
                        models.UquvMaterial.objects.filter(tSoxa_id=i).values())

                return JsonResponse({'s': s, 'q': q, 'auth': auth}, status=200, safe=False)
            else:
                s = list(models.TalimSoxasi.objects.all().values('id', 'name'))
                q = list(models.UquvMaterial.objects.all().values())
                return JsonResponse({'s': s, 'q': q, 'auth': auth})

        else:
            return response


class ClassMain4(generic.ListView):
    template_name = "main4.html"
    context_object_name = "qisqa_kurs"
    model = models.QisqaMuddatliKurslar

    def get_queryset(self):
        return models.QisqaMuddatliKurslar.objects.filter(kurs_tur_id=models.QisqaKursTur.objects.
                                                          get(id=1)).order_by("name")

    def get_context_data(self, **kwargs):
        context = super(ClassMain4, self).get_context_data(**kwargs)
        context['qisqa_tur'] = models.QisqaKursTur.objects.all()
        context['size'] = len(
            models.QisqaMuddatliKurslar.objects.filter(kurs_tur_id=models.QisqaKursTur.objects.get(id=1)))
        context['vil'] = HududViloyat.objects.all().order_by('name')
        context['tum'] = HududTuman.objects.all().order_by('name')
        context['videos'] = models.QisqaMuddatliKurslar.objects.filter(
            kurs_tur_id=models.QisqaKursTur.objects.get(id=4))
        return context

    def dispatch(self, request, *args, **kwargs):
        response = super(ClassMain4, self).dispatch(request, *args, **kwargs)

        if request.is_ajax() and request.method == 'GET':
            d = dict()
            if 'Infografika'.lower() in str(request.GET.get('selected')).lower():
                b = models.QisqaKursTur.objects.get(name=request.GET.get('selected'))
                s = list(models.QisqaMuddatliKurslar.objects.filter(kurs_tur_id=b).values())
                d = {b.id: b.name}
                return JsonResponse({'s': s, 'tur': d, 'info': True})
            elif request.GET.get('selected') != 'Kurslar':
                b = models.QisqaKursTur.objects.get(name=request.GET.get('selected'))
                s = list(models.QisqaMuddatliKurslar.objects.filter(kurs_tur_id=b).values())
                d = {b.id: b.name}
                return JsonResponse({'s': s, 'tur': d, 'info': False})
            else:
                for i in models.QisqaKursTur.objects.all():
                    d[i.id] = i.name
                s = list(models.QisqaMuddatliKurslar.objects.all().values())
                return JsonResponse({'s': s, 'tur': d, 'info': False})
        else:
            return response


def home5(request):
    vil = HududViloyat.objects.all().order_by('name')
    tum = HududTuman.objects.all().order_by('name')

    if request.is_ajax() and request.method == "GET":
        um = models.UquvMaterial.objects.filter(guv_nomer=request.GET.get('number').strip())
        uq = models.UquvQullanma.objects.filter(guv_nomer=request.GET.get('number').strip())
        if um:
            return JsonResponse({'guvohnoma': um.values()[0], 'tur': 'material'})
        elif uq:
            return JsonResponse({'guvohnoma': uq.values()[0], 'tur': 'qullanma'})
        return JsonResponse({'guvohnoma': [], 'tur': ''})

    return render(request, 'home5.html', {'vil': vil, 'tum': tum})


class ClassHome1Menu(generic.DetailView):
    template_name = 'home1.html'
    model = models.KasbVaMutaxasislik
    context_object_name = 'kasb_detail'

    def get_context_data(self, **kwargs):
        context = super(ClassHome1Menu, self).get_context_data(**kwargs)
        context['qullanma'] = models.UquvQullanma.objects.filter(k_va_m=kwargs['object'])
        context['vil'] = HududViloyat.objects.all().order_by('name')
        context['tum'] = HududTuman.objects.all().order_by('name')
        return context

    def get_queryset(self):
        response = super(ClassHome1Menu, self).get_queryset()
        models.KasbVaMutaxasislik.objects.filter(id=self.kwargs['pk']).update(view=F('view') + 1)
        return response


class ClassHome2(generic.DetailView):
    template_name = 'home2.html'
    model = models.UquvQullanma
    context_object_name = 'uquv_qullanma'

    def get_context_data(self, **kwargs):
        context = super(ClassHome2, self).get_context_data(**kwargs)
        context['vil'] = HududViloyat.objects.all().order_by('name')
        context['tum'] = HududTuman.objects.all().order_by('name')
        return context

    def get_queryset(self):
        response = super(ClassHome2, self).get_queryset()
        models.UquvMaterial.objects.filter(id=self.kwargs['pk']).update(view=F('view') + 1)
        return response


class ClassHome3(generic.DetailView):
    template_name = 'home3.html'
    model = models.UquvMaterial
    context_object_name = 'uquv_material'

    def get_context_data(self, **kwargs):
        context = super(ClassHome3, self).get_context_data(**kwargs)
        context['vil'] = HududViloyat.objects.all().order_by('name')
        context['tum'] = HududTuman.objects.all().order_by('name')
        return context

    def get_queryset(self):
        response = super(ClassHome3, self).get_queryset()
        models.UquvMaterial.objects.filter(id=self.kwargs['pk']).update(view=F('view') + 1)
        return response


class ClassHome4(generic.DetailView):
    template_name = 'home4.html'
    model = models.QisqaMuddatliKurslar
    context_object_name = 'qisqa_kurs'

    def get_context_data(self, **kwargs):
        context = super(ClassHome4, self).get_context_data(**kwargs)
        context['vil'] = HududViloyat.objects.all().order_by('name')
        context['tum'] = HududTuman.objects.all().order_by('name')
        return context


class ClassMain5(generic.ListView):
    template_name = 'main5.html'
    context_object_name = 'years'
    model = models.JurnalTur

    def get_queryset(self):
        return models.JurnalTur.objects.all().order_by('-year')

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(ClassMain5, self).get_context_data(**kwargs)
        context['jurnal'] = models.Jurnal.objects.all().order_by('-year_id', 'soni')
        context['vil'] = HududViloyat.objects.all().order_by('name')
        context['tum'] = HududTuman.objects.all().order_by('name')
        return context

    def dispatch(self, request, *args, **kwargs):
        response = super(ClassMain5, self).dispatch(request, *args, **kwargs)

        if request.is_ajax() and request.method == "GET":
            d = dict()
            y = list(models.JurnalTur.objects.all())
            auth = request.user.is_authenticated
            for i in y:
                d[i.id] = i.year
            if request.GET.get('selected') != "sungi":
                jur = list(models.Jurnal.objects.filter(
                    year_id=models.JurnalTur.objects.get(year=request.GET.get('selected'))).order_by('-year_id',
                                                                                                     'soni').values())
            else:
                jur = list(
                    models.Jurnal.objects.all().order_by('-year_id', 'soni').values())
            return JsonResponse({'s': jur, 'd': d, 'auth': auth})
        else:
            return response


def main6(request):
    usefull = models.SizUchunFoydali.objects.all()
    vil = HududViloyat.objects.all().order_by('name')
    tum = HududTuman.objects.all().order_by('name')
    return render(request, "main6.html", {'use': usefull, 'vil': vil, 'tum': tum})


class MuhokamaView(generic.ListView):
    model = models.Muhokama
    template_name = 'muhokama.html'
    context_object_name = 'muhokama'

    kasb_list = []

    def get_queryset(self):
        k_va_m = models.Muhokama.objects.all()
        self.kasb_list = Paginator(k_va_m, 10)
        return self.kasb_list.page(1).object_list

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(MuhokamaView, self).get_context_data(**kwargs)
        context['vil'] = HududViloyat.objects.all().order_by('name')
        context['tum'] = HududTuman.objects.all().order_by('name')
        context['size'] = models.Muhokama.objects.all().count
        return context

    def dispatch(self, request, *args, **kwargs):
        response = super(MuhokamaView, self).dispatch(request, *args, **kwargs)
        if request.is_ajax() and request.method == 'GET':
            if request.GET.get('selected') == 'pagination':
                try:
                    ids = [i.id for i in self.kasb_list.page(int(request.GET.get('page_number'))).object_list]
                    return JsonResponse({'muhokama': list(models.Muhokama.objects.filter(id__in=ids).values())})
                except:
                    return JsonResponse({'muhokama': []})
            elif request.GET.get('selected') != 'Barchasi':
                muh = list(models.Muhokama.objects.filter(_id__startswith=request.GET.get('selected')).values())
            else:
                muh = list(models.Muhokama.objects.all().values())
            return JsonResponse({'muhokama': muh})

        return response


class MuhokamaDetail(generic.DetailView):
    model = models.Muhokama
    template_name = 'muhokama_detail.html'
    context_object_name = 'muhokama'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(MuhokamaDetail, self).get_context_data(**kwargs)
        context['vil'] = HududViloyat.objects.all().order_by('name')
        context['tum'] = HududTuman.objects.all().order_by('name')
        return context


def NewsDetail(request, pk):
    news = models.Yangilik.objects.get(id=pk)
    news_list = models.Yangilik.objects.filter(~Q(id=pk)).order_by('?')[:5]
    return render(request, 'yangilik_detail.html', {'news': news, 'news_list': news_list})
