import { Component } from '@angular/core';
import {TripDataService} from 'src/app/trip-data-service/trip-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wycieczka';
  isOpen=false;
  addOpen=false;
  constructor(public tripData:TripDataService){}

  public openCart():void{
    this.isOpen=!this.isOpen;
  }
  public openAdd():void{
    this.addOpen=!this.addOpen;
  }
  public closeForm(){
    this.addOpen=false;
  }
}
