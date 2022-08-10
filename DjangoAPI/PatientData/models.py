from django.db import models
GENDER_CHOICES = (
    ('M', 'male'),
    ('F', 'female')
)


class PatientData(models.Model):

    # The Attributes of the database

    PatientId = models.AutoField(primary_key=True)
    PatientName = models.CharField(max_length=150,)
    MRN = models.CharField(max_length=10)
    Gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    DOB = models.DateField()
    HospitalName = models.CharField(max_length=200)
    LastUpdatedBy = models.CharField(max_length=120)
    LastUpdatedTime = models.DateTimeField(auto_now=True, blank=True)
    NoteId = models.CharField(max_length=10)
    NoteDateTime = models.DateTimeField(auto_now_add=True, blank=True)
    Prescription = models.TextField(max_length=600)
