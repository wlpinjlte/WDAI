import { Component } from '@angular/core';
import { TripDataService } from '../trip-data-service/trip-data.service';
@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent {
  now=new Date();
  today:string = this.now.getFullYear()+'-'+(this.now.getMonth()+1)+'-'+this.now.getDate();
  constructor(public tripData:TripDataService){}

  public getTrip(index:string):any{
    return this.tripData.tripArray().filter(a=>a.index==index)[0];
  }

  public getText(index:string):string{
    if(Date.parse(this.today)>Date.parse(this.getTrip(index).start)){
      return "Wycieczka się odbyła";
    }else if(Date.parse(this.today)>=Date.parse(this.getTrip(index).start) &&Date.parse(this.today)<=Date.parse(this.getTrip(index).end)){
      return "W trakcie";
    }else{
      return "Oczekujący";
    }
  }

  public getColor(index:string):string{
    if(Date.parse(this.today)>Date.parse(this.getTrip(index).start)){
      return "red";
    }else if(Date.parse(this.today)>=Date.parse(this.getTrip(index).start) &&Date.parse(this.today)<=Date.parse(this.getTrip(index).end)){
      return "green";
    }else{
      return "gold";
    }
  }
}
