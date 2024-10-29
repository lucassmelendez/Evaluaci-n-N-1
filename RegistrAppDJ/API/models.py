from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator, MinLengthValidator 

# Create your models here.
class Usuario(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.CharField(max_length=45,null=False)
    apellido=models.CharField(max_length=50,default='S/A')
    edad=models.IntegerField()

    def __str__(self) -> str:
        return self.nombre
    
class alumno(models.Model):
    apellido=models.CharField(max_length=50,default='S/A')
    correo=models.CharField(max_length=30,null=False,validators=[EmailValidator(message="Ingrese un correo válido.")] )
    edad=models.IntegerField()
    nombre=models.CharField(max_length=50,null=False)
    password=models.CharField(max_length=20,null=False)
    password2=models.CharField(max_length=20,null=False)

    def __str__(self) -> str:
        return self.nombre+' '+self.apellido
    
    # Validación adicional para contraseñas iguales
    def clean(self):
        super().clean()
        if self.password != self.password2:
            raise ValidationError("Las contraseñas no coinciden.")


class materias(models.Model):
    nombre = models.CharField(max_length=50, null=False)
    duracion_en_min = models.IntegerField()
    correo_profe = models.CharField(max_length=50, null=False)

    def __str__(self) -> str:
        return self.nombre

class profesor(models.Model):
    apellido = models.CharField(max_length=50, null='S/A')
    correo = models.CharField(max_length=30, null=False, validators=[EmailValidator(message="Ingrese un correo válido.")])
    curso = models.CharField(max_length=50, null=False)
    edad = models.IntegerField()
    nombre = models.CharField(max_length=50, null=False)
    password=models.CharField(max_length=20,null=False)
    password2=models.CharField(max_length=20,null=False)

    def __str__(self) -> str:
        return self.nombre+' '+self.apellido
    
    # Validación adicional para contraseñas iguales
    def clean(self):
        super().clean()
        if self.password != self.password2:
            raise ValidationError("Las contraseñas no coinciden.")