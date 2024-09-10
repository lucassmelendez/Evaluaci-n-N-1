import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-por-asistencia-curso',
  templateUrl: './por-asistencia-curso.page.html',
  styleUrls: ['./por-asistencia-curso.page.scss'],
})
export class PorAsistenciaCursoPage implements OnInit {

  students = [
    { name: 'Juan Pérez', attendance: 85 },
    { name: 'María García', attendance: 0 },
    { name: 'Pedro López', attendance: 78 },
    { name: 'Ana Martínez', attendance: 95 },
    { name: 'Luis Hernández', attendance: 80 },
    { name: 'Fransicso Silva', attendance: 30 },
    { name: 'Hector Alveal', attendance: 90 },
    { name: 'Omar Alveal', attendance: 78 },
    { name: 'Benjamin Alveak', attendance: 95 },
    { name: 'Pedro Ahumada', attendance: 80 },
    { name: 'Benjamin Bahamondes', attendance: 100 },
    { name: 'Ignacio Urrutia', attendance: 90 },
    { name: 'Kristal Huribe', attendance: 78 },
    { name: 'Alan gajardo', attendance: 95 },
    { name: 'Diego Plaza', attendance: 40 },
    { name: 'Matias Recabarren', attendance: 85 },
    { name: 'Alonso Gonzales', attendance: 10 },
    { name: 'Sebastian Piñera', attendance: 78 },
    { name: 'Maria Jose', attendance: 95 },
    { name: 'Jose Maria', attendance: 80 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
