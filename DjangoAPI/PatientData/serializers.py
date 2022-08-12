from rest_framework import serializers
from .models import PatientData


class PatientNewDataSerializer(serializers.ModelSerializer):
    # Serializer class to Make the incoming data comprehensible by python
    class Meta:
        model = PatientData
        fields = "__all__"


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
