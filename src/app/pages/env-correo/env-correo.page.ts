import { ConfirmCodePage } from './../confirm-code/confirm-code.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-env-correo',
  templateUrl: './env-correo.page.html',
  styleUrls: ['./env-correo.page.scss'],
})
export class EnvCorreoPage implements OnInit {

  constructor(private router: Router,
    public navCtrl: NavController,) { }
  
  correo:string=''


  ngOnInit() {
  }

  EnviarCodigo(){
    this.router.navigate(['/confirm-code']);
  }

  goBack() {
    this.navCtrl.back();
  }
}
