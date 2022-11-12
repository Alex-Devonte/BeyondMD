from django.db import models

# Create your models here.
class BoredAPI(models.Model):
    #tuple for activity types
    # TUPLE_EXAMPLE = (
    #     ('value to set on model','human-readable name')
    # )
    ACTIVITY_TYPE = [
        ('education', 'Education'),
        ('recreational', 'Recreational'),
        ('social', 'Social'),
        ('diy', 'DIY'),
        ('charity', 'Charity'),
        ('cooking', 'Cooking'),
        ('relaxation', 'Relaxation'),
        ('music', 'Music'),
        ('busywork', 'Busywork')
    ]

    activity = models.CharField(max_length=120)
    type = models.CharField(max_length=20, choices=ACTIVITY_TYPE)
    participants = models.CharField(max_length=2)