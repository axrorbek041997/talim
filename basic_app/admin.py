from django.contrib import admin
from django.http import HttpResponse
import csv

from . import models

admin.site.site_header = "Metodik ta'minot admin paneli"
admin.site.site_title = "Metodik ta'minot Admin Portal"
admin.site.index_title = "Metodik ta'minot portaliga Xush kelibsiz!!!"


# Register your models here.
@admin.register(models.BilimSoxasi)
class BilimSoxaAdmin(admin.ModelAdmin):
    list_display = ('_id', 'name')
    # list_editable = ('name',)


@admin.register(models.TalimSoxasi)
class TalimSoxaAdmin(admin.ModelAdmin):
    list_display = ('_id', 'name', 'bilim_id')


@admin.register(models.TalimYunalishi)
class TalimYunalishiAdmin(admin.ModelAdmin):
    list_display = ('_id', "name", 'tSoxa_id')


@admin.register(models.KasbVaMutaxasislik)
class KasbVaMutaxasisliklar(admin.ModelAdmin):
    list_display = ('_id', 'name', 'definition', 'date')
    search_fields = ('_id', 'name')
    # readonly_fields = ('slug',)


@admin.register(models.UquvQullanma)
class UquvQullanma(admin.ModelAdmin):
    list_display = ('name', 'definition', 'guv_nomer', 'guv_date', 'tSoxa_id', 'k_va_m')
    exclude = ('view',)


@admin.register(models.UquvMaterial)
class UquvMaterial(admin.ModelAdmin):
    list_display = ('name', 'definition', 'guv_nomer', 'guv_date', 'tSoxa_id')


@admin.register(models.Muhokama)
class KasbVaMutaxasisliklar(admin.ModelAdmin):
    list_display = ('_id', 'name', 'definition', 'date')
    search_fields = ('_id', 'name')


admin.site.register(models.QisqaKursTur)


@admin.register(models.QisqaMuddatliKurslar)
class QisqaKurs(admin.ModelAdmin):
    list_display = ('name', 'kurs_tur_id')


admin.site.register(models.SizUchunFoydali)
admin.site.register(models.JurnalTur)
admin.site.register(models.Jurnal)
admin.site.register(models.Yangilik)
