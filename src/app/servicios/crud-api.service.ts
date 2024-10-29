import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Alumno } from '../model/alumno';

@Injectable({
  providedIn: 'root'
})
export class CrudAPIService {

  constructor(private http:HttpClient) { }

  private rutaApiAlumno = "http://127.0.0.1:8000/api/alumno/"
   
  getAlumno():Observable<any>{
    return this.http.get<any>(this.rutaApiAlumno);
  }

}
