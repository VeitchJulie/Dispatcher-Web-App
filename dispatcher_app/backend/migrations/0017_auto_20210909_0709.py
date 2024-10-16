# Generated by Django 3.2.4 on 2021-09-09 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_auto_20210908_0843'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='endLat',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=5),
        ),
        migrations.AlterField(
            model_name='team',
            name='endLong',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=5),
        ),
        migrations.AlterField(
            model_name='team',
            name='lat',
            field=models.DecimalField(decimal_places=3, default=52.198, max_digits=5),
        ),
        migrations.AlterField(
            model_name='team',
            name='long',
            field=models.DecimalField(decimal_places=3, default=20.998, max_digits=5),
        ),
    ]
