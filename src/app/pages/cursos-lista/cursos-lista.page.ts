import { Component, OnInit } from '@angular/core';
import { ApiMateriasService } from 'src/app/servicios/api-materias.service'; // Corrige la importación
import { Materias } from 'src/app/model/materias';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.page.html',
  styleUrls: ['./cursos-lista.page.scss'],
})
export class CursosListaPage implements OnInit {
  
  materia: Materias[]; // Definición de la variable

  constructor(private apiMateriasService: ApiMateriasService) { } // Cambia a ApiMateriasService

  ngOnInit() {
    this.apiMateriasService.getMaterias().subscribe( // Usa el método correcto
      (data) => {
        console.log('Datos recibidos:', data); 
        this.materia = data; 
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
