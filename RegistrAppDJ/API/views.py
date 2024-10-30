from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json

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

def generar_pdf_alumnos(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="informe_alumnos.pdf"'

    p = canvas.Canvas(response)
    
    alumnos_list = alumno.objects.all()  
    y = 800
    p.setFont("Helvetica", 12)
    p.drawString(100, y + 20, "Informe de Alumnos")

    for alumno_instance in alumnos_list:  
        y -= 20  #
        p.drawString(100, y, f"ID: {alumno_instance.id} - Nombre: {alumno_instance.nombre} - Asistencia: {alumno_instance.asistencia}")

    p.showPage()
    p.save()
    return response

@csrf_exempt
@api_view(['POST'])
def guardar_alumno(request):
    try:
        data = json.loads(request.body)
        nuevo_alumno = alumno(
            nombre=data['nombre'],
            apellido=data['apellido'],
            edad=data['edad'],
            correo=data['correo'],
            password=data['password'],
            password2=data['password2'],
            asistencia=data.get('asistencia', 0) 
        )
        nuevo_alumno.save()
        return Response({"mensaje": "Alumno guardado en Django"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
