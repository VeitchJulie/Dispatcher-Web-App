# Generated by Django 3.2.4 on 2021-10-05 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0021_case'),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='date',
            field=models.DateField(auto_now=True),
        ),
    ]
