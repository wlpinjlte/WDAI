import { Component } from '@angular/core';
import data from '../../assets/json/data.json'
@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent {
  array=data;
}
