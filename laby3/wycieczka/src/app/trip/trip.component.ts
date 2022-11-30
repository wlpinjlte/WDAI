import { Component, Input } from '@angular/core';

export interface tripData{
  title:string;
  Contry:string;
  start:string;
  end:string;
  unitPrice:number;
  maxPlace:number;
  img:string;
  description:string;
}
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})  


export class TripComponent {
  @Input()object!: tripData;
}
