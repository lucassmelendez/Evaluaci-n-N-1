import { Component, OnInit } from '@angular/core';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { Alumno } from 'src/app/model/alumno';
import { ClaseService } from 'src/app/servicios/clase.service';

@Component({
  selector: 'app-por-asistencia-curso',
  templateUrl: './por-asistencia-curso.page.html',
  styleUrls: ['./por-asistencia-curso.page.scss'],
})
export class PorAsistenciaCursoPage implements OnInit {
  students: Alumno[] = [];
  totalClases: number = 0;

  constructor(
    private crudAPIService: CrudAPIService,
    private claseService: ClaseService
  ) {}

  ngOnInit() {
    this.loadAlumnos();
    this.claseService.totalClases$.subscribe((total) => {
      this.totalClases = total;
    });
  }

  loadAlumnos() {
    this.crudAPIService.getAlumno().subscribe(
      (data) => {
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
