import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Materias } from '../model/materias';

@Injectable({
  providedIn: 'root'
})
export class ApiMateriasService {

  constructor(private http:HttpClient) { }

  private rutaApiMaterias = "http://127.0.0.1:8000/api/materias/"
   
  getMaterias():Observable<any>{
    return this.http.get<any>(this.rutaApiMaterias);
  }
}
