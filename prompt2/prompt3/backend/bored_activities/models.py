from django.db import models

# Create your models here.
class Bored_Activities(models.Model):
    class Meta:
        verbose_name_plural = 'bored_activities'
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

    #list comprehension for getting numbers in the range 1,5
    PARTICIPANTS_RANGE = ([(str(i),str(i)) for i in range(1, 6)])

    activity = models.CharField(max_length=120)
    type = models.CharField(max_length=20, choices=ACTIVITY_TYPE)
    participants = models.CharField(max_length=1, choices=PARTICIPANTS_RANGE)

    def _str_(self):
        return self.activity