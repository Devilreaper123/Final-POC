from django.db import models
from django.contrib.auth.models import User
GENDER_CHOICES = (
    ('M', 'male'),
    ('F', 'female')
)


class PatientData(models.Model):

    # The Attributes of the database

    PatientId = models.CharField(max_length=15)
    PatientName = models.CharField(max_length=150,)
    MRN = models.AutoField(primary_key=True)
    Gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    DOB = models.DateField()
    HospitalName = models.CharField(max_length=200)
    LastUpdatedBy = models.CharField(max_length=120)
    LastUpdatedTime = models.DateTimeField(auto_now=True, blank=True)
    NoteId = models.CharField(max_length=10)
    NoteDateTime = models.DateTimeField(auto_now_add=True, blank=True)
    Prescription = models.TextField(max_length=1200)
