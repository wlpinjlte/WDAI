import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service/authentication-service.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  persistence:string='';
  constructor(public authService:AuthenticationServiceService){
    this.persistence=authService.persistence;
  }
  
  public setPersistence(){
    console.log(this.persistence);
    this.authService.setPersistence(this.persistence);
  }
}
