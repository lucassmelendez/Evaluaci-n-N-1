import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Alumno } from '../model/alumno';

@Injectable({
  providedIn: 'root'
})
export class CrudAPIService {
  private rutaApiAlumno = "http://127.0.0.1:8000/api/alumno/";
  private rutaIncrementarAsistencia = "http://127.0.0.1:8000/api/incrementar_asistencia/";
  private rutaAsistenciasPorMateria = "http://127.0.0.1:8000/api/asistencias_por_materia/";

  constructor(private http: HttpClient, private firestore: AngularFirestore) {} // Inyecta AngularFirestore

  getAlumno(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.rutaApiAlumno);
  }

  incrementarAsistencia(data: { correo: string }): Observable<any> {
    return this.http.post(this.rutaIncrementarAsistencia, data);
  }

  // Método para actualizar la asistencia en Firestore
  actualizarAsistenciaEnFirestore(studentId: string, asistencia: number): Promise<void> {
    return this.firestore.collection('alumnos').doc(studentId).update({ asistencia });
  }

  getAlumnoPDF(): Observable<Blob> {
    return this.http.get(`${this.rutaApiAlumno}pdf/`, { responseType: 'blob' });
  }

  getAsistenciasPorMateria(): Observable<any> {
    return this.http.get<any>(this.rutaAsistenciasPorMateria);
  }
}
