# Generated by Django 3.2.4 on 2021-07-01 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_alter_team_state'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='lat',
            field=models.IntegerField(default=52.198),
        ),
        migrations.AddField(
            model_name='team',
            name='long',
            field=models.IntegerField(default=20.998),
        ),
    ]
