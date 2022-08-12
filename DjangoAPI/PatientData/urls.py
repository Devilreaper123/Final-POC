from django.urls import re_path, path
from . import views
from .views import UploadCsvFileView,UploadJsonFileView,View
urlpatterns = [
    # for GET,POST Method
    re_path(r'^patientnewdata$', views.patientDataApi),
    # for PUT and DELETE Method
    re_path(r'^patientnewdata/([0-9]+)$', views.patientDataApi),
    # for uploading the csv file
    path('uploadcsv/', UploadCsvFileView.as_view(), name='upload-csv'),
    # for Uploading the Json file
    path('uploadjson/', UploadJsonFileView.as_view(), name='upload-json'),
    #list view for paginations
    re_path(r'^list/$', View.as_view()),    
]
