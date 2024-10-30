import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../model/alumno';


@Injectable({
  providedIn: 'root'
})
export class CrudAPIService {
  private rutaApiAlumno = "http://127.0.0.1:8000/api/alumno/";
  private rutaIncrementarAsistencia = "http://127.0.0.1:8000/api/incrementar_asistencia/";

  constructor(private http: HttpClient) {}

  getAlumno(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.rutaApiAlumno);
  }

  incrementarAsistencia(data: { correo: string }): Observable<any> {
    return this.http.post(this.rutaIncrementarAsistencia, data);
  }

  getAlumnoPDF(): Observable<Blob> {
    return this.http.get(`${this.rutaApiAlumno}pdf/`, { responseType: 'blob' });
  }
}

