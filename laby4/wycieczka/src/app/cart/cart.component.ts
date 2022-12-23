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
      sum+=value*this.getUnitPrice(key);
    })
    return sum;
  }
  public getName(index:string):string{
    return this.tripdata.tripArray().filter(a=>a.index==index)[0].title;
  }
  public getUnitPrice(index:string):number{
    return this.tripdata.tripArray().filter(a=>a.index==index)[0].unitPrice
  }
}
