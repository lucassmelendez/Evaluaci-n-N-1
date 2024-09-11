import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.page.html',
  styleUrls: ['./confirm-code.page.scss'],
})
export class ConfirmCodePage implements OnInit {


  constructor(private router: Router,
    public navCtrl: NavController,){}

  codigo:string=''
  password:string=''
  password2:string=''

  ngOnInit() {
  }

  EnviarCodigo(){
    if (this.password !== this.password2) {
      console.error('Las contraseñas no coinciden');
      return;
    }else{
      console.log('contraseña cambiada correctamente');
      this.router.navigate(['/login']);
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
