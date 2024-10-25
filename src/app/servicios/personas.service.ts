import { Injectable } from '@angular/core';
//Librerias
import {Persona} from '../model/Persona';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private afs:AngularFirestore) { }

  grabar(persona: Persona){
    return this.afs.collection('persona').add(persona);
  }
}
