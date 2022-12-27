import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripDataService } from '../trip-data-service/trip-data.service';
@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css']
})
export class SingleTripComponent {
  index:number=-1;
  data:any;
  constructor(public tripData:TripDataService,private route: ActivatedRoute){}
  public ngOnInit(){
    this.route.params.subscribe(params=>{
      this.index=params['id'];
    })
    this.route.params.subscribe().unsubscribe();
    this.data=this.tripData.tripArray().filter(a=>a.index==this.index)[0];
    console.log(this.data);
  }
  
}
