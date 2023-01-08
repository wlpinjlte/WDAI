import { Component } from '@angular/core';
import {TripDataService} from '../trip-data-service/trip-data.service';
@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent {
  constructor(public tripService:TripDataService){}
}
