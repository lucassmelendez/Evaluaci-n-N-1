import { LoginPage } from './../login/login.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router,
    public navCtrl: NavController,) { }
  
  nombre:string=''
  apellido:String=''
  edad:Number
  correo:string=''
  password:string=''
  password2:string=''

  ngOnInit() {
  }

  registrar(){
    this.router.navigate(['/login']);
  }

  goBack() {
    this.navCtrl.back();
  }
}
