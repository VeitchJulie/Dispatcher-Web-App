# Generated by Django 3.2.4 on 2021-08-24 10:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_auto_20210824_1005'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='endLat',
        ),
        migrations.RemoveField(
            model_name='team',
            name='endLong',
        ),
    ]
