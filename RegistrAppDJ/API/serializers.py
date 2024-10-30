from .models import *
from rest_framework import serializers
from .models import Usuario, alumno, materias, profesor

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__' 

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = alumno
        fields = '__all__'

class MateriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = materias
        fields = '__all__'

class ProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = profesor
        fields = '__all__'