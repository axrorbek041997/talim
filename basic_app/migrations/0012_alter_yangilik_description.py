# Generated by Django 3.2.3 on 2021-10-16 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basic_app', '0011_auto_20211012_1426'),
    ]

    operations = [
        migrations.AlterField(
            model_name='yangilik',
            name='description',
            field=models.TextField(),
        ),
    ]
