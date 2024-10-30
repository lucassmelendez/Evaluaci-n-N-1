from .models import *
from rest_framework import serializers

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class AsistenciaSerializer(serializers.ModelSerializer):
    materia = serializers.StringRelatedField()

    class Meta:
        model = Asistencia
        fields = ['materia', 'fecha', 'presente']

class MateriasSerializer(serializers.ModelSerializer):
    asistencias = AsistenciaSerializer(many=True, read_only=True)

    class Meta:
        model = materias  
        fields = ['nombre', 'asistencias', 'correo_profe']

class AlumnoSerializer(serializers.ModelSerializer):
    materias = MateriasSerializer(many=True, read_only=True)

    class Meta:
        model = alumno
        fields = '__all__'
class ProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = profesor
        fields = '__all__'
