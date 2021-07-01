from typing import Any
from django.db import models

class Team(models.Model):
    STATES = (
        ('Free', 'Free'),
        ('Busy', 'Busy'),
    )
    top_id = models.CharField(max_length=20, unique = True)
    state = models.CharField(max_length=4, choices=STATES, default='F')
    lat = models.CharField(max_length=6, default=52.198)
    long = models.CharField(max_length=6, default=20.998)
    
    def __str__(self):
        return self.top_id
