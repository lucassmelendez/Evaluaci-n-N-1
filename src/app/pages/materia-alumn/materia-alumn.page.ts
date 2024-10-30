import { Component, OnInit } from '@angular/core';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { Alumno } from 'src/app/model/alumno'; 

@Component({
  selector: 'app-materia-alumn',
  templateUrl: './materia-alumn.page.html',
  styleUrls: ['./materia-alumn.page.scss'],
})
export class MateriaAlumnPage implements OnInit {
  students: Alumno[] = []; 
  totalClases: number = 20;

  constructor(private crudAPIService: CrudAPIService) {}

  ngOnInit() {
    this.loadAlumnos();
    this.loadAsistenciasPorMateria();
  }

  loadAlumnos() {
    this.crudAPIService.getAlumno().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.students = data;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
  
  loadAsistenciasPorMateria() {
    this.crudAPIService.getAsistenciasPorMateria().subscribe(
        (data) => {
            console.log('Datos recibidos:', data);
            this.students = data;
        },
        (error) => {
            console.error('Error al obtener los datos:', error);
        }
    );
  }

  getAttendancePercentage(asistencia: number): string {
    if (this.totalClases === 0) return '0%';
    const percentage = (asistencia / this.totalClases) * 100;
    return percentage.toFixed(2) + '%';
  }
}
