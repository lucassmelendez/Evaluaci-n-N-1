import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrProfePageRoutingModule } from './qr-profe-routing.module';

import { QrProfePage } from './qr-profe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrProfePageRoutingModule
  ],
  declarations: [QrProfePage]
})
export class QrProfePageModule {}
