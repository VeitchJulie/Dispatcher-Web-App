# Generated by Django 3.2.4 on 2021-11-21 09:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0030_team_distance'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='distance',
        ),
    ]
