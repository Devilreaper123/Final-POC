# Generated by Django 4.0.5 on 2022-08-12 04:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('PatientData', '0003_alter_patientdata_prescription'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='patientdata',
            options={'ordering': ['NoteDateTime']},
        ),
    ]
