import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Materias } from '../model/materias';


@Injectable({
  providedIn: 'root'
})
export class ApiMateriasService {
  private apiUrl = "http://127.0.0.1:8000/api/materias/"; // Solo usa una URL base

  constructor(private http: HttpClient) { }

  getMaterias(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Usa la misma URL para obtener materias
  }

  getTotalClases(materiaId: number): Observable<Materias> {
    return this.http.get<Materias>(`${this.apiUrl}${materiaId}/`); // Usa apiUrl aquí también
  }
}
