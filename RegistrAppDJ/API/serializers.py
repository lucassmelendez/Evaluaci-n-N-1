from .models import *
from rest_framework import serializers

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__' 

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = alumno
        fields = '__all__'