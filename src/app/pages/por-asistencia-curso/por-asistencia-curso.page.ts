import { Component, OnInit } from '@angular/core';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { Alumno } from 'src/app/model/alumno'; 

@Component({
  selector: 'app-por-asistencia-curso',
  templateUrl: './por-asistencia-curso.page.html',
  styleUrls: ['./por-asistencia-curso.page.scss'],
})
export class PorAsistenciaCursoPage implements OnInit {
  students: Alumno[] = []; 

  constructor(private crudAPIService: CrudAPIService) {}

  ngOnInit() {
    this.loadAlumnos();
  }

  loadAlumnos() {
    this.crudAPIService.getAlumno().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.students = data;
        console.log('Alumnos con asistencia:', this.students);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
