from django.urls import re_path as url
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
from .views import (
    UsuarioViewSet,
    AlumnoViewSet,
    MateriasViewSet,
    ProfesorViewSet,
    IncrementarAsistenciaView,
    guardar_alumno,
)


urlpatterns = [
    path('api/usuario/', UsuarioViewSet.as_view(), name='usuario-list'),
    path('api/alumno/', AlumnoViewSet.as_view(), name='alumno-list'),
    path('api/materias/', MateriasViewSet.as_view(), name='materias-list'),
    path('api/profesor/', ProfesorViewSet.as_view(), name='profesor-list'),
    path('api/incrementar_asistencia/', IncrementarAsistenciaView.as_view(), name='incrementar-asistencia'),
    url(r'^api/alumno/pdf/$', generar_pdf_alumnos),
    path('api/guardar-alumno/', guardar_alumno, name='guardar_alumno'),
]

urlpatterns=format_suffix_patterns(urlpatterns)