# Generated by Django 5.0.6 on 2024-11-05 02:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0013_rename_nombre_materias_materia'),
    ]

    operations = [
        migrations.RenameField(
            model_name='materias',
            old_name='materia',
            new_name='nombre',
        ),
    ]
