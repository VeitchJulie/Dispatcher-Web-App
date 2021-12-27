# Generated by Django 3.2.4 on 2021-12-27 18:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0035_alter_case_team'),
    ]

    operations = [
        migrations.AlterField(
            model_name='case',
            name='team',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='cases', to='backend.team'),
        ),
    ]
