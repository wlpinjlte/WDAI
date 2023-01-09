import { Component } from '@angular/core';
import {TripDataService} from '../trip-data-service/trip-data.service';
import { AuthenticationServiceService } from '../authentication-service/authentication-service.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  reservationArray:any[]=[];
  constructor(public tripdata:TripDataService,public authService:AuthenticationServiceService){}

  public fullCost():number{
    let sum=0;
    this.authService.getResevationArray().forEach(a=>{
      sum+=a.quantity*this.getUnitPrice(a.index);
    })
    return sum;
  }

  public getName(index:string):string{
    return this.tripdata.tripArray().filter(a=>a.index==index)[0].title;
  }

  public getUnitPrice(index:string):number{
    return this.tripdata.tripArray().filter(a=>a.index==index)[0].unitPrice
  }

  public buyOne(index:string){
    this.tripdata.buyTrip(index);
  }
  
  public buyAll(){
    this.tripdata.buyAll();
  }
}
