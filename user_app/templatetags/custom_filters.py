from django import template

register = template.Library()


@register.filter('get_name')
def get_name(value):
    return ' '.join(value.split()[:2])


@register.filter('my_date')
def my_date(val):
    return val.strftime('%d.%m.%y - %H:%M')
