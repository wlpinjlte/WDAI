import { trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TripDataService} from '../trip-data-service/trip-data.service';
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


export class TripComponent implements OnInit{
  @Input()object: tripData={title:"",Contry:"",start:'',end:'',unitPrice:0,maxPlace:0,img:'',description:''};
  @Input()index: number=-1;
  currPlace!: number;
  constructor(public tripService:TripDataService){}

  ngOnInit() {
    this.currPlace=this.object.maxPlace;
  }
  
  public addButton(): void{
    this.currPlace=Math.min(this.currPlace+1,this.object.maxPlace);
    this.avabileEmiter();
    console.log(this.currPlace);
  }

  public substrackButton(): void{
    this.currPlace=Math.max(this.currPlace-1,0);
    this.avabileEmiter();
    console.log(this.currPlace);
  }

  public getStockColor():string{
    if(this.currPlace==0){
      return "red";
    }
    if(this.currPlace<4){
      return "orange";
    }
    return "white";
  }

  public getPColor():string{
    if(this.object.maxPlace-this.currPlace>=10){
      return "red"
    }
    return "green";
  }
  
  public avabileEmiter(){
    if(this.currPlace==0){
      this.tripService.avaibleChange(this.index,false);
    }else{
      this.tripService.avaibleChange(this.index,true);
    }
  }

  public deleteComponet(){
    console.log(1);
    this.tripService.deleteComponet(this.index);
  }
}
