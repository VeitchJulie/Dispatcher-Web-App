# Generated by Django 3.2.4 on 2021-11-03 18:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0026_team_token'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='case',
            options={'ordering': ['date']},
        ),
        migrations.RenameField(
            model_name='case',
            old_name='long',
            new_name='lng',
        ),
        migrations.AlterField(
            model_name='case',
            name='state',
            field=models.CharField(choices=[('ONGOING', 'ONGOING'), ('PAST', 'PAST')], default='default', max_length=7),
        ),
        migrations.AlterField(
            model_name='case',
            name='team',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='cases', to='backend.team'),
        ),
    ]
