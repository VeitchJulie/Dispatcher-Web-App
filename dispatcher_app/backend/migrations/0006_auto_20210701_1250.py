# Generated by Django 3.2.4 on 2021-07-01 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20210701_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='lat',
            field=models.CharField(default=52.198, max_length=6),
        ),
        migrations.AlterField(
            model_name='team',
            name='long',
            field=models.CharField(default=20.998, max_length=6),
        ),
    ]
