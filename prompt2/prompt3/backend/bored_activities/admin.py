from django.contrib import admin
from .models import Bored_Activities

class Bored_Activities_Admin(admin.ModelAdmin):
    list_display = ('activity', 'type', 'participants')

# Register your models here.
admin.site.register(Bored_Activities, Bored_Activities_Admin)

