from typing import Any
from django.db import models

class Team(models.Model):
    STATES = (
        ('Free', 'Free'),
        ('Busy', 'Busy'),
    )
    top_id = models.CharField(max_length=20, unique = True)
    state = models.CharField(max_length=4, choices=STATES, default='F')
    lat = models.DecimalField(max_digits=40, decimal_places=30, blank=False, default=52.198)
    long = models.DecimalField(max_digits=40, decimal_places=30, blank=False, default=20.998)
    endLat = models.DecimalField(max_digits=40, decimal_places=30, blank=True)
    endLong = models.DecimalField(max_digits=40, decimal_places=30, blank=True)
    
    def __str__(self):
        return self.top_id
