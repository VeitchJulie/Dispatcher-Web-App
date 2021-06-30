from typing import Any
from django.db import models

class Team(models.Model):
    STATES = (
        ('F', 'Free'),
        ('B', 'Busy'),
    )
    top_id = models.CharField(max_length=20, unique = True)
    state = models.CharField(max_length=1, choices=STATES, default='Free')
    
    def __str__(self):
        return self.top_id
