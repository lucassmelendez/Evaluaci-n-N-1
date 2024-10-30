from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import alumno

# Create your views here.
class UsuarioViewSet(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class AlumnoViewSet(generics.ListCreateAPIView):
    queryset = alumno.objects.all()
    serializer_class = AlumnoSerializer

class MateriasViewSet(generics.ListCreateAPIView):
    queryset = materias.objects.all()
    serializer_class = MateriasSerializer

class ProfesorViewSet(generics.ListCreateAPIView):
    queryset = profesor.objects.all()
    serializer_class = ProfesorSerializer

class IncrementarAsistenciaView(APIView):
    def post(self, request):
        correo = request.data.get('correo')
        
        if not correo:
            return Response({'error': 'Correo no proporcionado.'}, status=status.HTTP_400_BAD_REQUEST)
        
        alumno_obj = get_object_or_404(alumno, correo=correo)
        
        alumno_obj.asistencia += 1
        alumno_obj.save()
        
        return Response({'success': True, 'asistencia': alumno_obj.asistencia}, status=status.HTTP_200_OK)