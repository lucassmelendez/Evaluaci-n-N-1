import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/model/Contacto';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.page.html',
  styleUrls: ['./ver.page.scss'],
})
export class VerPage implements OnInit {

  constructor() { }

  arreglo:Contacto[]
  
  ngOnInit() {
    this.arreglo=JSON.parse(localStorage.getItem("contactos") ?? '')
  }

}
