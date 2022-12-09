import { Component } from '@angular/core';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {
  title: string='';
  Contry:string='';
  start:string='';
  end:string='';
  unitPrice:number=0;
  maxPlace:number=0;
  img:string='';
  description:string='';

}
