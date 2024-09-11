import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materia-alumn',
  templateUrl: './materia-alumn.page.html',
  styleUrls: ['./materia-alumn.page.scss'],
})
export class MateriaAlumnPage implements OnInit {

  materias = [
    {name: 'Arquitectura', attendance: 90},
    {name: 'Calidad de Software', attendance: 85},
    {name: 'Estadistica Descriptiva', attendance: 70},
    {name: 'Etica para el Trabajo', attendance: 40},
    {name: 'Ingles Promedio', attendance: 60},
    {name: 'Principios de la Fe Cristiana', attendance: 93},
    {name: 'Proceso de Portafolio', attendance: 92},
    {name: 'Programación de Aplicaciones Moviles', attendance: 92},
  ]

  constructor() { }

  ngOnInit() {
  }

}
