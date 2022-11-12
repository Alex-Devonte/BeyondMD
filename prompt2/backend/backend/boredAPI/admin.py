from django.contrib import admin
from .models import BoredAPI

class BoredAPIAdmin(admin.ModelAdmin):
    list_display = ('activity', 'type', 'participants')

# Register your models here.
admin.site.register(BoredAPI, BoredAPIAdmin)