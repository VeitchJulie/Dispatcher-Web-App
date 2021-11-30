from typing import Any
from django.db import models

class Team(models.Model):
    STATES = (
        ('Free', 'Free'),
        ('Busy', 'Busy'),
    )
    id = models.CharField(max_length = 20, primary_key=True)
    token = models.CharField(max_length=200, blank=False, default="token")
    state = models.CharField(max_length=4, choices=STATES, default='F')
    lat = models.DecimalField(max_digits=40, decimal_places=30, blank=False, default=52.198)
    long = models.DecimalField(max_digits=40, decimal_places=30, blank=False, default=20.998)
    endLat = models.DecimalField(max_digits=40, decimal_places=30, blank=True)
    endLong = models.DecimalField(max_digits=40, decimal_places=30, blank=True)
    # distance = models.DecimalField(max_digits=10, decimal_places=1, blank=True, default=0)
    
    def __str__(self):
        return self.id

class Case(models.Model):
    STATES =(
        ('TOACCEPT', 'TOACCEPT'),
        ('ONGOING', 'ONGOING'),
        ('PAST', 'PAST'),
    )
    id = models.AutoField(primary_key=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, default = 0000, related_name='cases')
    state = models.CharField(max_length=8, choices=STATES, default='default')
    lat = models.DecimalField(max_digits=40, decimal_places=30, blank=True)
    lng = models.DecimalField(max_digits=40, decimal_places=30, blank=True)   
    name = models.CharField(max_length=50, blank=True)
    phone = models.CharField(max_length=12, blank=True)
    extraInformation = models.CharField(max_length=256, blank=True)
    date = models.DateTimeField(verbose_name=("Creation date"), auto_now_add=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['date']
    