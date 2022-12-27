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
  fillter:number=0;
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

  public fillterCheck(text:string){
    if(this.fillter==0){
      return true;
    }else if(this.fillter==1 && text=="Wycieczka się odbyła"){
      return true;
    }else if(this.fillter==2 && text=="W trakcie"){
      return true;
    }else if(this.fillter==3 && text=="Oczekujący"){
      return true;
    }
    return false;
  }
}
