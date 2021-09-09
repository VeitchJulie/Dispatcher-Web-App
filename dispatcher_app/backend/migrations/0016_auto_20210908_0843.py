# Generated by Django 3.2.4 on 2021-09-08 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_auto_20210908_0842'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='lat',
            field=models.DecimalField(decimal_places=30, default=52.198, max_digits=40),
        ),
        migrations.AlterField(
            model_name='team',
            name='long',
            field=models.DecimalField(decimal_places=30, default=20.998, max_digits=40),
        ),
    ]
