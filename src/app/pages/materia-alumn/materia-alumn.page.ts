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
  materias: Materias[] = []; 
  totalClases: number = 20;

  constructor(private crudAPIService: CrudAPIService) {}

  ngOnInit() {
    this.loadMateriasConAsistencias();
  }

  loadMateriasConAsistencias() {
    this.crudAPIService.getMateriasConAsistencias().subscribe(
      (data: Materias[]) => {
          console.log('Datos recibidos:', data);
          this.materias = data;  // Asegúrate de que aquí se esté asignando correctamente
      },
      (error: any) => {
          console.error('Error al obtener los datos:', error);
      }
  );
  }

  getAttendancePercentage(asistencias: Asistencia[]): number {
    const totalClasses = asistencias.length;
    const presentCount = asistencias.filter(a => a.asistencia).length;
    
    return totalClasses > 0 ? (presentCount / totalClasses) * 100 : 0;
  }

  getAttendanceCount(alumnoId: number): number {
    const materiaConAsistencias = this.materias.find(m => m.asistencias.some(a => a.alumno_id === alumnoId));
    if (materiaConAsistencias) {
      return materiaConAsistencias.asistencias.filter(a => a.alumno_id === alumnoId && a.asistencia).length;
    }
    return 0; // Si no hay asistencias, devuelve 0
  }
}
