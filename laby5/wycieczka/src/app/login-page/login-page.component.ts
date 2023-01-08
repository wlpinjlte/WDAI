import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service/authentication-service.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css','../../assets/bootstrap/bootstrap.min.css']
})
export class LoginPageComponent {
  email:string='';
  password:string='';
  constructor(public auth:AuthenticationServiceService){}
  public singIn(){
    this.auth.logIn(this.email,this.password);
  }

  public singUp(){
    console.log(this.email,this.password);
    this.auth.creatAccount(this.email,this.password);
  }
}
