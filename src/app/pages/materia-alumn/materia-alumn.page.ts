import { Component, OnInit } from '@angular/core';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { Materias } from 'src/app/model/materias'; 
import { Asistencia } from 'src/app/model/materias';

@Component({
  selector: 'app-materia-alumn',
  templateUrl: './materia-alumn.page.html',
  styleUrls: ['./materia-alumn.page.scss'],
})
export class MateriaAlumnPage implements OnInit {
  materias: any[] = []; 
  totalClases: number = 20;

  constructor(private crudAPIService: CrudAPIService) {}

  ngOnInit() {
    this.loadMateriasConAsistencias();
    console.log(this.materias);
  }

  loadMateriasConAsistencias() {
    this.crudAPIService.getMateriasConAsistencias().subscribe(
      (data: Materias[]) => {
        console.log('Materias cargadas:', data); 
        this.materias = data;
      },
      (error) => {
        console.error('Error al cargar materias:', error);
      }
    );
  }

  getAttendancePercentage(asistencias: Asistencia[]): number {
    const totalClases = asistencias.length;
    const diasPresentes = this.getAttendanceCount(asistencias);
    return totalClases > 0 ? (diasPresentes / totalClases) * 100 : 0;
}

  getAttendanceCount(asistencias: Asistencia[]): number {
    return asistencias.filter(asistencia => asistencia.asistencia).length;
}
}
