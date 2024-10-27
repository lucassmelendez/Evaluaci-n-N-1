import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-profe',
  templateUrl: './qr-profe.page.html',
  styleUrls: ['./qr-profe.page.scss'],
})
export class QrProfePage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.valorQR=JSON.stringify(this.valorQRJSON)
  }

  valorQR:string='clase'
  valorQRJSON={
    codigocurso:'0001',
    codigoprofe:'005',
    fecha:'27/10/2024 10:30'
  }
}
