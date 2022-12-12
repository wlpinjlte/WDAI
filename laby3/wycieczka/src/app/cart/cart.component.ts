import { Component } from '@angular/core';
import {TripDataService} from '../trip-data-service/trip-data.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(public tripdata:TripDataService){}

  public fullCost():number{
    let sum=0;
    this.tripdata.reservationDetail.forEach((value,key)=>{
      sum+=value[0]*value[1];
    })
    return sum;
  }
}
