import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/model/Contacto';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  constructor() { }
  nombre:string
  apellido:string
  direccion:string
  telefono:string

  ngOnInit() {
  }

  grabar(){
    let arreglo:Contacto[]
    if (localStorage.getItem("contactos")) {
      arreglo=JSON.parse(localStorage.getItem("contactos") ?? '')
    } else {
      arreglo=[]
    }
    let con=new Contacto()
    con.nombre=this.nombre
    con.apellido=this.apellido
    con.direccion=this.direccion
    con.telefono=this.telefono
    arreglo.push(con)
    localStorage.setItem("contactos",JSON.stringify(arreglo))
    console.log("Grabo")
  }
}
