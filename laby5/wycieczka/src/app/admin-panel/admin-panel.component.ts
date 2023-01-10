import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service/authentication-service.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  constructor(public authService:AuthenticationServiceService){}
  persistence:string='';
  public setPersistence(){
    console.log(this.persistence);
    this.authService.setPersistence(this.persistence);
  }
}
