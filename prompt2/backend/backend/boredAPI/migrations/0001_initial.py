# Generated by Django 4.1.3 on 2022-11-12 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BoredAPI',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity', models.CharField(max_length=120)),
                ('type', models.CharField(choices=[('education', 'Education'), ('recreational', 'Recreational'), ('social', 'Social'), ('diy', 'DIY'), ('charity', 'Charity'), ('cooking', 'Cooking'), ('relaxation', 'Relaxation'), ('music', 'Music'), ('busywork', 'Busywork')], max_length=20)),
                ('participants', models.CharField(max_length=2)),
            ],
        ),
    ]