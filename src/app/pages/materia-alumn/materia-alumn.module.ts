import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriaAlumnPageRoutingModule } from './materia-alumn-routing.module';

import { MateriaAlumnPage } from './materia-alumn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriaAlumnPageRoutingModule
  ],
  declarations: [MateriaAlumnPage]
})
export class MateriaAlumnPageModule {}
