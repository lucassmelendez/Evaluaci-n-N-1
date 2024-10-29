import { Component, OnInit } from '@angular/core';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { Alumno } from 'src/app/model/alumno'; 

@Component({
  selector: 'app-por-asistencia-curso',
  templateUrl: './por-asistencia-curso.page.html',
  styleUrls: ['./por-asistencia-curso.page.scss'],
})
export class PorAsistenciaCursoPage implements OnInit {
  students: Alumno[] = []; // Variable para almacenar los alumnos

  constructor(private crudAPIService: CrudAPIService) {}

  // Llamar al servicio al inicializar el componente
  ngOnInit() {
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
}