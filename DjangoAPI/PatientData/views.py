from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import PatientData
from .serializers import PatientNewDataSerializer, FileUploadSerializer
from rest_framework import generics
import pandas as pd
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 40


@csrf_exempt
def patientDataApi(req, id=0):

    # Patient Data Api : This function creates the API for the Django Model for
    # Performing basic CRUD operations (Create , Read , Update , Delete) which is to
    # be Consumed by Reactjs FrontEnd
    try:
        if req.method == 'GET':
            patients = PatientData.objects.all()
            patients_serializer = PatientNewDataSerializer(patients, many=True)
            return JsonResponse(patients_serializer.data, safe=False)
        elif req.method == 'POST':
            try:
                patient_data = JSONParser().parse(req)
                patients_serializer = PatientNewDataSerializer(
                    data=patient_data)
                if patients_serializer.is_valid():
                    patients_serializer.save()
                    return JsonResponse("ADDED SUCCESSFULLY", safe=False)
            except Exception as e:
                return print("FAILED TO ADD:", e)
        elif req.method == 'PUT':
            try:
                patient_data = JSONParser().parse(req)
                patients = PatientData.objects.get(
                    MRN=patient_data['MRN'])
                department_serializer = PatientNewDataSerializer(
                    patients, data=patient_data)
                if department_serializer.is_valid():
                    department_serializer.save()
                    return JsonResponse("UPDATED SUCCESSFULLY", safe=False)
            except Exception as e:
                return print("FAILED TO ADD:", e)
        elif req.method == 'DELETE':
            department = PatientData.objects.get(MRN=id)
            department.delete()
            return JsonResponse("DELETED SUCCESSFULLY", safe=False)
    except Exception as e:
        return print("FAILED TO PERFORM CRUD:", e)


class UploadCsvFileView(generics.CreateAPIView):

    # This Class is used for taking the data from user in form of .CSV file
    # and populating the Database with its Data.

    serializer_class = FileUploadSerializer

    def postCsv(self, request, *args, **kwargs):
        # The Function populates the database by reading the .CSV file and
        # creating an instance of the Patient by filling the data matching to its
        # corresponding row in the CSV file
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            file = serializer.validated_data['file']
            reader = pd.read_csv(file, encoding='utf8')
            for _, row in reader.iterrows():
                gender = row[3].upper()
                new_file = PatientData.objects.create(
                    PatientName=row[1],
                    PatientId=row[2],
                    Gender=gender,
                    DOB=row[4],
                    HospitalName=row[5],
                    LastUpdatedBy=str("ronit"),
                    NoteId=row[6],
                    Prescription=row[7],
                )
                new_file.save()
            return JsonResponse("status", safe=False)
        except Exception as e:
            return print("Failed to load .CSV file :", e)


class UploadJsonFileView(generics.CreateAPIView):

    # This Class is used for taking the data from user in form of .Json file
    # and populating the Database with its Data.

    serializer_class = FileUploadSerializer

    def postJson(self, request):
        # The Function populates the database by reading the .Json file and
        # creating an instance of the Patient by filling the data matching to its
        # Keys in the Json file
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            file = serializer.validated_data['file']
            reader = pd.read_json(file, typ='series', encoding="utf8")
            new_file = PatientData.objects.create(
                PatientId=reader['patient_id'],
                PatientName=reader['patient_name'],
                Gender=reader['gender'].upper(),
                DOB=reader['dob'],
                HospitalName=reader['hospital_name'],
                LastUpdatedBy=str("ronit"),
                NoteId=reader['note_id'],
                Prescription=reader['text'],
            )
            new_file.save()
            return JsonResponse("status", safe=False)
        except Exception as e:
            return print("FAILED TO Load .Json file:", e)


class View(generics.ListAPIView):
    serializer_class = PatientNewDataSerializer
    queryset = PatientData.objects.all()
    def paginatedPatientDataApi(self, req):

        # Patient Data Api : This function is Mainly used for Pagination of the 
        # data from backend so that the frontend can consume the paginated data easily
        try:
            if req.method == 'GET':
                patients = self.get_queryset()
                patients_serializer = PatientNewDataSerializer(
                    data=patients, many=True)
                return JsonResponse(patients_serializer.data, safe=False)
        except Exception as e:
            return print("FAILED TO RETRIVE DATA:", e)
