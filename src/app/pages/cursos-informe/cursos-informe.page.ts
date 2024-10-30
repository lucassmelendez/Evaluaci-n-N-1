import { Component, OnInit } from '@angular/core';
import { ApiMateriasService } from 'src/app/servicios/api-materias.service'; // Corrige la importación
import { Materias } from 'src/app/model/materias';

@Component({
  selector: 'app-cursos-informe',
  templateUrl: './cursos-informe.page.html',
  styleUrls: ['./cursos-informe.page.scss'],
})
export class CursosInformePage implements OnInit {

  materia: Materias[];

  constructor(private apiMateriasService: ApiMateriasService) { }

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
