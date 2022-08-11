# Generated by Django 4.0.5 on 2022-08-11 06:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PatientData',
            fields=[
                ('PatientId', models.CharField(max_length=15)),
                ('PatientName', models.CharField(max_length=150)),
                ('MRN', models.AutoField(primary_key=True, serialize=False)),
                ('Gender', models.CharField(choices=[('M', 'male'), ('F', 'female')], max_length=1)),
                ('DOB', models.DateField()),
                ('HospitalName', models.CharField(max_length=200)),
                ('LastUpdatedTime', models.DateTimeField(auto_now=True)),
                ('NoteId', models.CharField(max_length=10)),
                ('NoteDateTime', models.DateTimeField(auto_now_add=True)),
                ('Prescription', models.TextField(max_length=600)),
                ('LastUpdatedBy', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
