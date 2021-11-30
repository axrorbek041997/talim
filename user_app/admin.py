import csv

from django.contrib import admin
from django.db.models import Count
from django.http import HttpResponse

from . import models
from django.contrib.auth.admin import UserAdmin


class ExportCSVMixin:
    a = ['name', 'user_phone', 'viloyat', 'tuman', 'muassasa', 'lavozimi', 'is_type']

    def export_as_csv(self, request, queryset):
        meta = self.model._meta

        # field_names = [field.name for field in meta.fields if field.name in self.user_fields]
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=Viloyatlar bo\'yicha.csv'
        writer = csv.writer(response, delimiter=',', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['Nomer', 'Hudud', 'Soni'])
        query = models.HududViloyat.objects.annotate(user_count=Count('myuser')).values_list('name', 'user_count')
        for obj in query:
            row = writer.writerow([list(query).index(obj) + 1, obj[0], obj[1]])
        return response

    export_as_csv.short_description = "Viloyat bo'yicha"

    def export_as_csv_tuman(self, request, queryset):
        meta = self.model._meta

        # field_names = [field.name for field in meta.fields if field.name in self.user_fields]
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=Tumanlar bo\'yicha.csv'
        writer = csv.writer(response, delimiter=',', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['Nomer', 'Hudud', 'Soni'])
        query = models.HududTuman.objects.annotate(user_count=Count('myuser')).values_list('name', 'user_count')
        for obj in query:
            row = writer.writerow([list(query).index(obj) + 1, obj[0], obj[1]])
        return response

    export_as_csv_tuman.short_description = "Tuman bo'yicha"

    def export_as_csv_selected(self, request, queryset):
        meta = self.model._meta

        field_names = [field.name for field in meta.fields if field.name in self.a]
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=Foydalanuvchilar.csv'
        writer = csv.writer(response)
        writer.writerow(field_names)
        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names if field in self.a])
        return response

    export_as_csv_selected.short_description = "Export Selected"


# Register your models here.
class CustomUserAdmin(UserAdmin, ExportCSVMixin):
    ordering = ('date_joined', 'is_superuser')
    search_fields = ['name', 'user_phone', 'viloyat__name', 'tuman__name']
    list_filter = ('name', 'user_phone')
    list_display = ('name', 'user_phone', 'viloyat', 'tuman', 'is_superuser')

    fieldsets = (
        (None,
         {'fields': ('name', 'user_phone', 'viloyat', 'tuman', 'is_type', 'lavozimi', 'password', 'is_superuser')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups')}),
        # ('Group Permissions', {
        #     'classes': ('collapse',),
        #     'fields': ('groups', 'user_permissions',)
        # })
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'name', 'user_phone', 'viloyat', 'tuman', 'is_type', 'lavozimi', 'password1', 'password2', 'is_active',
                'is_staff')
        }
         ),
    )

    actions = ['export_as_csv', 'export_as_csv_tuman', 'export_as_csv_selected']


admin.site.register(models.MyUser, CustomUserAdmin)

admin.site.register(models.HududViloyat)
admin.site.register(models.UserMuhokama)


@admin.register(models.HududTuman)
class Tuman(admin.ModelAdmin):
    list_display = ('name', 'viloyat_id')
